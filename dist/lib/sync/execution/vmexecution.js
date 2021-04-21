"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VMExecution = void 0;
const execution_1 = require("./execution");
const util_1 = require("../../util");
const vm_1 = __importDefault(require("@sbr/vm"));
const state_1 = require("@sbr/vm/dist/state");
const sbr_merkle_patricia_tree_1 = require("sbr-merkle-patricia-tree");
const debug_1 = require("../../util/debug");
class VMExecution extends execution_1.Execution {
    /**
     * Create new VM excution module
     */
    constructor(options) {
        super(options);
        this.hardfork = '';
        this.syncing = false;
        this.NUM_BLOCKS_PER_ITERATION = 50;
        if (!this.config.vm) {
            const trie = new sbr_merkle_patricia_tree_1.SecureTrie(this.stateDB);
            const stateManager = new state_1.DefaultStateManager({
                common: this.config.execCommon,
                trie,
            });
            this.vm = new vm_1.default({
                common: this.config.execCommon,
                blockchain: this.chain.blockchain,
                stateManager,
            });
        }
        else {
            this.vm = this.config.vm;
            //@ts-ignore blockchain has readonly property
            this.vm.blockchain = this.chain.blockchain;
        }
    }
    /**
     * Initializes VM execution. Must be called before run() is called
     */
    async open() {
        const headBlock = await this.vm.blockchain.getIteratorHead();
        const blockNumber = headBlock.header.number.toNumber();
        this.config.execCommon.setHardforkByBlockNumber(blockNumber);
        this.hardfork = this.config.execCommon.hardfork();
        this.config.logger.info(`Initializing VM execution hardfork=${this.hardfork}`);
    }
    /**
     * Runs the VM execution
     *
     * @returns number of blocks executed
     */
    async run() {
        if (this.running || !this.syncing) {
            return 0;
        }
        this.running = true;
        let txCounter = 0;
        let numExecuted;
        const blockchain = this.vm.blockchain;
        let startHeadBlock = await this.vm.blockchain.getIteratorHead();
        let canonicalHead = await this.vm.blockchain.getLatestBlock();
        let headBlock;
        let parentState;
        let errorBlock;
        while ((numExecuted === undefined || numExecuted === this.NUM_BLOCKS_PER_ITERATION) &&
            !startHeadBlock.hash().equals(canonicalHead.hash()) &&
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            this.syncing) {
            headBlock = undefined;
            parentState = undefined;
            errorBlock = undefined;
            this.vmPromise = blockchain.iterator('vm', async (block, reorg) => {
                if (errorBlock) {
                    return;
                }
                // determine starting state for block run
                // if we are just starting or if a chain re-org has happened
                if (!headBlock || reorg) {
                    const parentBlock = await blockchain.getBlock(block.header.parentHash);
                    parentState = parentBlock.header.stateRoot;
                    // generate genesis state if we are at the genesis block
                    // we don't have the genesis state
                    if (!headBlock) {
                        await this.vm.stateManager.generateCanonicalGenesis();
                    }
                    else {
                        parentState = headBlock.header.stateRoot;
                    }
                }
                // run block, update head if valid
                try {
                    const blockNumber = block.header.number.toNumber();
                    const hardfork = this.config.execCommon.getHardforkByBlockNumber(blockNumber);
                    if (hardfork !== this.hardfork) {
                        const hash = util_1.short(block.hash());
                        this.config.logger.info(`Execution hardfork switch on block number=${blockNumber} hash=${hash} old=${this.hardfork} new=${hardfork}`);
                        this.hardfork = this.config.execCommon.setHardforkByBlockNumber(blockNumber);
                    }
                    // Block validation is redundant here and leads to consistency problems
                    // on PoA clique along blockchain-including validation checks
                    // (signer states might have moved on when sync is ahead)
                    await this.vm.runBlock({ block, root: parentState, skipBlockValidation: true });
                    txCounter += block.transactions.length;
                    // set as new head block
                    headBlock = block;
                }
                catch (error) {
                    // TODO: determine if there is a way to differentiate between the cases
                    // a) a bad block is served by a bad peer -> delete the block and restart sync
                    //    sync from parent block
                    // b) there is a consensus error in the VM -> stop execution until the
                    //    consensus error is fixed
                    //
                    // For now only option b) is implemented, atm this is a very likely case
                    // and the implemented behavior helps on debugging.
                    // Option a) would likely need some block comparison of the same blocks
                    // received by different peer to decide on bad blocks
                    // (minimal solution: receive block from 3 peers and take block if there is
                    // is equally served from at least 2 peers)
                    /*try {
                    // remove invalid block
                      await blockchain!.delBlock(block.header.hash())
                    } catch (error) {
                      this.config.logger.error(
                        `Error deleting block number=${blockNumber} hash=${hash} on failed execution`
                      )
                    }
                    this.config.logger.warn(
                      `Deleted block number=${blockNumber} hash=${hash} on failed execution`
                    )
        
                    const hardfork = this.config.execCommon.getHardforkByBlockNumber(blockNumber)
                    if (hardfork !== this.hardfork) {
                      this.config.logger.warn(
                        `Set back hardfork along block deletion number=${blockNumber} hash=${hash} old=${this.hardfork} new=${hardfork}`
                      )
                      this.config.execCommon.setHardforkByBlockNumber(blockNumber)
                    }*/
                    // Option a): set iterator head to the parent block so that an
                    // error can repeatedly processed for debugging
                    const blockNumber = block.header.number.toNumber();
                    const hash = util_1.short(block.hash());
                    this.config.logger.warn(`Execution of block number=${blockNumber} hash=${hash} hardfork=${this.hardfork} failed`);
                    if (this.config.debugCode) {
                        await debug_1.debugCodeReplayBlock(this, block);
                    }
                    this.emit('error', error);
                    errorBlock = block;
                }
            }, this.NUM_BLOCKS_PER_ITERATION);
            numExecuted = (await this.vmPromise);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (errorBlock) {
                await this.chain.blockchain.setIteratorHead('vm', errorBlock.header.parentHash);
                return 0;
            }
            const endHeadBlock = await this.vm.blockchain.getHead();
            if (numExecuted > 0) {
                const firstNumber = startHeadBlock.header.number.toNumber();
                const firstHash = util_1.short(startHeadBlock.hash());
                const lastNumber = endHeadBlock.header.number.toNumber();
                const lastHash = util_1.short(endHeadBlock.hash());
                this.config.logger.info(`Executed blocks count=${numExecuted} first=${firstNumber} hash=${firstHash} hardfork=${this.hardfork} last=${lastNumber} hash=${lastHash} with txs=${txCounter}`);
            }
            else {
                this.config.logger.warn(`No blocks executed past chain head hash=${util_1.short(endHeadBlock.hash())} number=${endHeadBlock.header.number.toNumber()}`);
            }
            startHeadBlock = endHeadBlock;
            canonicalHead = await this.vm.blockchain.getLatestBlock();
        }
        this.running = false;
        return numExecuted;
    }
    /**
     * Stop VM execution. Returns a promise that resolves once its stopped.
     * @returns {Promise}
     */
    async stop() {
        var _a;
        if (this.vmPromise) {
            // ensure that we wait that the VM finishes executing the block (and flushing the trie cache)
            await this.vmPromise;
        }
        await ((_a = this.stateDB) === null || _a === void 0 ? void 0 : _a.close());
        await super.stop();
        return true;
    }
}
exports.VMExecution = VMExecution;
//# sourceMappingURL=vmexecution.js.map