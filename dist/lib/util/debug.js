"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugCodeReplayBlock = void 0;
/**
 * Generates a code snippet which can be used to replay an erraneous block
 * locally in the VM
 *
 * @param block
 */
async function debugCodeReplayBlock(execution, block) {
    const code = `
/**
 * Script for locally executing a block in the EthereumJS VM,
 * meant to be used from packages/vm directory within the
 * https://github.com/ethereumjs/ethereumjs-monorepo repository.
 * 
 * Block: ${block.header.number}
 * Hardfork: ${execution.hardfork}
 * 
 * Run with: DEBUG=vm:*:*,vm:*,-vm:ops:* ts-node [SCRIPT_NAME].ts
 * 
 */

const level = require('level')
import Common from '@sbr/common'
import { Block } from '@sbr/block'
import VM from './lib'
import { SecureTrie as Trie } from 'sbr-merkle-patricia-tree'
import { DefaultStateManager } from './lib/state'
import Blockchain from '@sbr/blockchain'

const main = async () => {
  const common = new Common({ chain: '${execution.config.execCommon.chainName()}', hardfork: '${execution.hardfork}' })
  const block = Block.fromRLPSerializedBlock(Buffer.from('${block
        .serialize()
        .toString('hex')}', 'hex'), { common })

  const stateDB = level('${execution.config.getStateDataDirectory()}')
  const trie = new Trie(stateDB)
  const stateManager = new DefaultStateManager({ trie, common })
  // Ensure we run on the right root
  stateManager.setStateRoot(Buffer.from('${(await execution.vm.stateManager.getStateRoot(true)).toString('hex')}', 'hex'))


  const chainDB = level('${execution.config.getChainDataDirectory()}')
  const blockchain = await Blockchain.create({
    db: chainDB,
    common,
    validateBlocks: true,
    validateConsensus: false,
  })
  const vm = new VM({ stateManager, blockchain, common })

  await vm.runBlock({ block })
}

main()
    `;
    execution.config.logger.info(code);
}
exports.debugCodeReplayBlock = debugCodeReplayBlock;
//# sourceMappingURL=debug.js.map