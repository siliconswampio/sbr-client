"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eth = void 0;
const tx_1 = require("@sbr/tx");
const sbr_util_1 = require("sbr-util");
const rlp_1 = require("rlp");
const validation_1 = require("../validation");
const error_code_1 = require("../error-code");
/**
 * eth_* RPC module
 * @memberof module:rpc/modules
 */
class Eth {
    /**
     * Create eth_* RPC module
     * @param client Client to which the module binds
     */
    constructor(client) {
        var _a, _b;
        const service = client.services.find((s) => s.name === 'eth');
        this._chain = service.chain;
        this._vm = (_b = (_a = service.synchronizer) === null || _a === void 0 ? void 0 : _a.execution) === null || _b === void 0 ? void 0 : _b.vm;
        const ethProtocol = service.protocols.find((p) => p.name === 'eth');
        this.ethVersion = Math.max(...ethProtocol.versions);
        this.blockNumber = validation_1.middleware(this.blockNumber.bind(this), 0);
        this.call = validation_1.middleware(this.call.bind(this), 2, [
            [validation_1.validators.transaction(['to'])],
            [validation_1.validators.blockOption],
        ]);
        this.estimateGas = validation_1.middleware(this.estimateGas.bind(this), 2, [
            [validation_1.validators.transaction()],
            [validation_1.validators.blockOption],
        ]);
        this.getBalance = validation_1.middleware(this.getBalance.bind(this), 2, [
            [validation_1.validators.address],
            [validation_1.validators.blockOption],
        ]);
        this.getBlockByNumber = validation_1.middleware(this.getBlockByNumber.bind(this), 2, [
            [validation_1.validators.hex],
            [validation_1.validators.bool],
        ]);
        this.getBlockByHash = validation_1.middleware(this.getBlockByHash.bind(this), 2, [
            [validation_1.validators.hex, validation_1.validators.blockHash],
            [validation_1.validators.bool],
        ]);
        this.getBlockTransactionCountByHash = validation_1.middleware(this.getBlockTransactionCountByHash.bind(this), 1, [[validation_1.validators.hex, validation_1.validators.blockHash]]);
        this.getCode = validation_1.middleware(this.getCode.bind(this), 2, [
            [validation_1.validators.address],
            [validation_1.validators.blockOption],
        ]);
        this.getStorageAt = validation_1.middleware(this.getStorageAt.bind(this), 3, [
            [validation_1.validators.address],
            [validation_1.validators.hex],
            [validation_1.validators.blockOption],
        ]);
        this.getTransactionCount = validation_1.middleware(this.getTransactionCount.bind(this), 2, [
            [validation_1.validators.address],
            [validation_1.validators.blockOption],
        ]);
        this.protocolVersion = validation_1.middleware(this.protocolVersion.bind(this), 0, []);
    }
    /**
     * Returns number of the most recent block.
     * @param params An empty array
     */
    async blockNumber(_params = []) {
        const latestHeader = await this._chain.getLatestHeader();
        return `0x${latestHeader.number.toString(16)}`;
    }
    /**
     * Executes a new message call immediately without creating a transaction on the block chain.
     * Currently only "latest" block is supported.
     * @param params An array of two parameters:
     *   1. The transaction object
     *       * from (optional) - The address the transaction is sent from
     *       * to - The address the transaction is directed to
     *       * gas (optional) - Integer of the gas provided for the transaction execution
     *       * gasPrice (optional) - Integer of the gasPrice used for each paid gas
     *       * value (optional) - Integer of the value sent with this transaction
     *       * data (optional) - Hash of the method signature and encoded parameters.
     *   2. integer block number, or the string "latest", "earliest" or "pending"
     * @returns The return value of the executed contract.
     */
    async call(params) {
        const [transaction, blockOpt] = params;
        if (!this._vm) {
            throw new Error('missing vm');
        }
        // use a copy of the vm in case new blocks are executed,
        // and to not make any underlying changes during the call
        const vm = this._vm.copy();
        if (blockOpt !== 'latest') {
            const latest = await vm.blockchain.getLatestHeader();
            const number = latest.number.toString(16);
            if (blockOpt !== `0x${number}`) {
                return {
                    code: error_code_1.INVALID_PARAMS,
                    message: `Currently only "latest" block supported`,
                };
            }
        }
        if (!transaction.gas) {
            // If no gas limit is specified use the last block gas limit as an upper bound.
            const latest = await vm.blockchain.getLatestHeader();
            transaction.gas = latest.gasLimit;
        }
        const txData = Object.assign(Object.assign({}, transaction), { gasLimit: transaction.gas });
        const tx = tx_1.Transaction.fromTxData(txData, { common: vm._common, freeze: false });
        // set from address
        const from = transaction.from ? sbr_util_1.Address.fromString(transaction.from) : sbr_util_1.Address.zero();
        tx.getSenderAddress = () => {
            return from;
        };
        const { execResult } = await vm.runTx({ tx });
        return sbr_util_1.bufferToHex(execResult.returnValue);
    }
    /**
     * Generates and returns an estimate of how much gas is necessary to allow the transaction to complete.
     * The transaction will not be added to the blockchain.
     * Note that the estimate may be significantly more than the amount of gas actually used by the transaction,
     * for a variety of reasons including EVM mechanics and node performance.
     * Currently only "latest" block is supported.
     * @param params An array of two parameters:
     *   1. The transaction object
     *       * from (optional) - The address the transaction is sent from
     *       * to - The address the transaction is directed to
     *       * gas (optional) - Integer of the gas provided for the transaction execution
     *       * gasPrice (optional) - Integer of the gasPrice used for each paid gas
     *       * value (optional) - Integer of the value sent with this transaction
     *       * data (optional) - Hash of the method signature and encoded parameters.
     *   2. integer block number, or the string "latest", "earliest" or "pending"
     * @returns The amount of gas used.
     */
    async estimateGas(params) {
        const [transaction, blockOpt] = params;
        if (!this._vm) {
            throw new Error('missing vm');
        }
        // use a copy of the vm in case new blocks are executed
        const vm = this._vm.copy();
        if (blockOpt !== 'latest') {
            const latest = await vm.blockchain.getLatestHeader();
            const number = latest.number.toString(16);
            if (blockOpt !== `0x${number}`) {
                return {
                    code: error_code_1.INVALID_PARAMS,
                    message: `Currently only "latest" block supported`,
                };
            }
        }
        if (!transaction.gas) {
            // If no gas limit is specified use the last block gas limit as an upper bound.
            const latest = await this._chain.getLatestHeader();
            transaction.gas = latest.gasLimit;
        }
        const txData = Object.assign(Object.assign({}, transaction), { gasLimit: transaction.gas });
        const tx = tx_1.Transaction.fromTxData(txData, { common: vm._common, freeze: false });
        // set from address
        const from = transaction.from ? sbr_util_1.Address.fromString(transaction.from) : sbr_util_1.Address.zero();
        tx.getSenderAddress = () => {
            return from;
        };
        const { gasUsed } = await vm.runTx({
            tx,
            skipNonce: true,
            skipBalance: true,
            skipBlockGasLimitValidation: true,
        });
        return `0x${gasUsed.toString(16)}`;
    }
    /**
     * Returns the balance of the account at the given address.
     * Currently only "latest" block is supported.
     * @param params An array of two parameters:
     *   1. address of the account
     *   2. integer block number, or the string "latest", "earliest" or "pending"
     */
    async getBalance(params) {
        const [addressHex, blockOpt] = params;
        if (!this._vm) {
            throw new Error('missing vm');
        }
        // use a copy of the vm in case new blocks are sync'd
        const vm = this._vm.copy();
        if (blockOpt !== 'latest') {
            const latest = await vm.blockchain.getLatestHeader();
            const number = latest.number.toString(16);
            if (blockOpt !== `0x${number}`) {
                return {
                    code: error_code_1.INVALID_PARAMS,
                    message: `Currently only "latest" block supported`,
                };
            }
        }
        const address = sbr_util_1.Address.fromString(addressHex);
        const account = await vm.stateManager.getAccount(address);
        return `0x${account.balance.toString(16)}`;
    }
    /**
     * Returns information about a block by block number.
     * @param params An array of two parameters:
     *   1. integer of a block number
     *   2. boolean - if true returns the full transaction objects, if false only the hashes of the transactions.
     */
    async getBlockByNumber(params) {
        const [blockNumber, includeTransactions] = params;
        const blockNumberBN = new sbr_util_1.BN(sbr_util_1.stripHexPrefix(blockNumber), 16);
        const block = await this._chain.getBlock(blockNumberBN);
        const json = block.toJSON();
        if (!includeTransactions) {
            json.transactions = block.transactions.map((tx) => sbr_util_1.bufferToHex(tx.hash()));
        }
        return json;
    }
    /**
     * Returns information about a block by hash.
     * @param params An array of two parameters:
     *   1. a block hash
     *   2. boolean - if true returns the full transaction objects, if false only the hashes of the transactions.
     */
    async getBlockByHash(params) {
        const [blockHash, includeTransactions] = params;
        const block = await this._chain.getBlock(sbr_util_1.toBuffer(blockHash));
        const json = block.toJSON();
        if (!includeTransactions) {
            json.transactions = block.transactions.map((tx) => sbr_util_1.bufferToHex(tx.hash()));
        }
        return json;
    }
    /**
     * Returns the transaction count for a block given by the block hash.
     * @param params An array of one parameter: A block hash
     */
    async getBlockTransactionCountByHash(params) {
        const [blockHash] = params;
        const block = await this._chain.getBlock(sbr_util_1.toBuffer(blockHash));
        const json = block.toJSON();
        return `0x${json.transactions.length.toString(16)}`;
    }
    /**
     * Returns code of the account at the given address.
     * Currently only "latest" block is supported.
     * @param params An array of two parameters:
     *   1. address of the account
     *   2. integer block number, or the string "latest", "earliest" or "pending"
     */
    async getCode(params) {
        const [addressHex, blockOpt] = params;
        if (!this._vm) {
            throw new Error('missing vm');
        }
        // use a copy of the vm in case new blocks are sync'd
        const vm = this._vm.copy();
        if (blockOpt !== 'latest') {
            const latest = await vm.blockchain.getLatestHeader();
            const number = latest.number.toString(16);
            if (blockOpt !== `0x${number}`) {
                return {
                    code: error_code_1.INVALID_PARAMS,
                    message: `Currently only "latest" block supported`,
                };
            }
        }
        const address = sbr_util_1.Address.fromString(addressHex);
        const code = await vm.stateManager.getContractCode(address);
        return sbr_util_1.bufferToHex(code);
    }
    /**
     * Returns the value from a storage position at a given address.
     * Currently only "latest" block is supported.
     * @param params An array of three parameters:
     *   1. address of the storage
     *   2. integer of the position in the storage
     *   3. integer block number, or the string "latest", "earliest" or "pending"
     */
    async getStorageAt(params) {
        const [addressHex, positionHex, blockOpt] = params;
        if (!this._vm) {
            throw new Error('missing vm');
        }
        // use a copy of the vm in case new blocks are executed
        const vm = this._vm.copy();
        if (blockOpt !== 'latest') {
            const latest = await vm.blockchain.getLatestHeader();
            const number = latest.number.toString(16);
            if (blockOpt !== `0x${number}`) {
                return {
                    code: error_code_1.INVALID_PARAMS,
                    message: `Currently only "latest" block supported`,
                };
            }
        }
        const address = sbr_util_1.Address.fromString(addressHex);
        const storageTrie = await vm.stateManager._getStorageTrie(address);
        const position = sbr_util_1.setLengthLeft(sbr_util_1.toBuffer(positionHex), 32);
        const storage = await storageTrie.get(position);
        return storage ? sbr_util_1.bufferToHex(sbr_util_1.setLengthLeft(rlp_1.decode(storage), 32)) : '0x';
    }
    /**
     * Returns the number of transactions sent from an address.
     * Currently only "latest" block is supported.
     * @param params An array of two parameters:
     *   1. address of the account
     *   2. integer block number, or the string "latest", "earliest" or "pending"
     */
    async getTransactionCount(params) {
        const [addressHex, blockOpt] = params;
        if (!this._vm) {
            throw new Error('missing vm');
        }
        // use a copy of the vm in case new blocks are executed
        const vm = this._vm.copy();
        if (blockOpt !== 'latest') {
            const latest = await vm.blockchain.getLatestHeader();
            const number = latest.number.toString(16);
            if (blockOpt !== `0x${number}`) {
                return {
                    code: error_code_1.INVALID_PARAMS,
                    message: `Currently only "latest" block supported`,
                };
            }
        }
        const address = sbr_util_1.Address.fromString(addressHex);
        const account = await vm.stateManager.getAccount(address);
        return `0x${account.nonce.toString(16)}`;
    }
    /**
     * Returns the current ethereum protocol version as a hex-encoded string
     * @param params An empty array
     */
    protocolVersion(_params = []) {
        return `0x${this.ethVersion.toString(16)}`;
    }
}
exports.Eth = Eth;
//# sourceMappingURL=eth.js.map