"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3 = void 0;
const sbr_util_1 = require("sbr-util");
const validation_1 = require("../validation");
const util_1 = require("../../util");
/**
 * web3_* RPC module
 * @memberof module:rpc/modules
 */
class Web3 {
    /**
     * Create web3_* RPC module
     * @param client Client to which the module binds
     */
    constructor(client) {
        const service = client.services.find((s) => s.name === 'eth');
        this._chain = service.chain;
        this.clientVersion = validation_1.middleware(this.clientVersion.bind(this), 0, []);
        this.sha3 = validation_1.middleware(this.sha3.bind(this), 1, [[validation_1.validators.hex]]);
    }
    /**
     * Returns the current client version
     * @param params An empty array
     */
    clientVersion(_params = []) {
        return util_1.getClientVersion();
    }
    /**
     * Returns Keccak-256 (not the standardized SHA3-256) of the given data
     * @param params The data to convert into a SHA3 hash
     */
    sha3(params) {
        const rawDigest = sbr_util_1.keccak(sbr_util_1.toBuffer(params[0]));
        const hexEncodedDigest = sbr_util_1.addHexPrefix(rawDigest.toString('hex'));
        return hexEncodedDigest;
    }
}
exports.Web3 = Web3;
//# sourceMappingURL=web3.js.map