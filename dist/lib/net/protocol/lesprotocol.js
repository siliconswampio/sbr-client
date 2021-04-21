"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LesProtocol = void 0;
const sbr_util_1 = require("sbr-util");
const block_1 = require("@sbr/block");
const protocol_1 = require("./protocol");
const id = new sbr_util_1.BN(0);
/**
 * Implements les/1 and les/2 protocols
 * @memberof module:net/protocol
 */
class LesProtocol extends protocol_1.Protocol {
    /**
     * Create les protocol
     * @param {LesProtocolOptions}
     */
    constructor(options) {
        super(options);
        this.protocolMessages = [
            {
                name: 'Announce',
                code: 0x01,
                encode: ({ headHash, headNumber, headTd, reorgDepth }) => [
                    // TO DO: handle state changes
                    headHash,
                    headNumber.toArrayLike(Buffer),
                    headTd.toArrayLike(Buffer),
                    new sbr_util_1.BN(reorgDepth).toArrayLike(Buffer),
                ],
                decode: ([headHash, headNumber, headTd, reorgDepth]) => ({
                    // TO DO: handle state changes
                    headHash: headHash,
                    headNumber: new sbr_util_1.BN(headNumber),
                    headTd: new sbr_util_1.BN(headTd),
                    reorgDepth: sbr_util_1.bufferToInt(reorgDepth),
                }),
            },
            {
                name: 'GetBlockHeaders',
                code: 0x02,
                response: 0x03,
                encode: ({ reqId, block, max, skip = 0, reverse = false }) => [
                    (reqId === undefined ? id.iaddn(1) : new sbr_util_1.BN(reqId)).toArrayLike(Buffer),
                    [sbr_util_1.BN.isBN(block) ? block.toArrayLike(Buffer) : block, max, skip, !reverse ? 0 : 1],
                ],
                decode: ([reqId, [block, max, skip, reverse]]) => ({
                    reqId: new sbr_util_1.BN(reqId),
                    block: block.length === 32 ? block : new sbr_util_1.BN(block),
                    max: sbr_util_1.bufferToInt(max),
                    skip: sbr_util_1.bufferToInt(skip),
                    reverse: sbr_util_1.bufferToInt(reverse) === 0 ? false : true,
                }),
            },
            {
                name: 'BlockHeaders',
                code: 0x03,
                encode: ({ reqId, bv, headers }) => [
                    new sbr_util_1.BN(reqId).toArrayLike(Buffer),
                    new sbr_util_1.BN(bv).toArrayLike(Buffer),
                    headers.map((h) => h.raw()),
                ],
                decode: ([reqId, bv, headers]) => ({
                    reqId: new sbr_util_1.BN(reqId),
                    bv: new sbr_util_1.BN(bv),
                    headers: headers.map((h) => {
                        return block_1.BlockHeader.fromValuesArray(h, {
                            hardforkByBlockNumber: true,
                            common: this.config.chainCommon,
                        });
                    }),
                }),
            },
        ];
        this.chain = options.chain;
        this.flow = options.flow;
        // TODO: "no init value" error was caught by TS compiler. Is `false` the correct default?
        this.isServer = false;
    }
    /**
     * Name of protocol
     * @type {string}
     */
    get name() {
        return 'les';
    }
    /**
     * Protocol versions supported
     * @type {number[]}
     */
    get versions() {
        return [2, 1];
    }
    /**
     * Messages defined by this protocol
     * @type {Protocol~Message[]}
     */
    get messages() {
        return this.protocolMessages;
    }
    /**
     * Opens protocol and any associated dependencies
     * @return {Promise}
     */
    async open() {
        if (this.opened) {
            return false;
        }
        await this.chain.open();
        this.opened = true;
    }
    /**
     * Encodes status into LES status message payload
     * @return {Object}
     */
    encodeStatus() {
        var _a, _b;
        let serveOptions = {};
        if (this.flow) {
            serveOptions = {
                serveHeaders: 1,
                serveChainSince: 0,
                serveStateSince: 0,
                txRelay: 1,
                'flowControl/BL': new sbr_util_1.BN(this.flow.bl).toArrayLike(Buffer),
                'flowControl/MRR': new sbr_util_1.BN(this.flow.mrr).toArrayLike(Buffer),
                'flowControl/MRC': Object.entries(this.flow.mrc).map(([name, { base, req }]) => {
                    const { code } = this.messages.find((m) => m.name === name);
                    return [code, base, req];
                }),
            };
        }
        return Object.assign({ networkId: this.chain.networkId.toArrayLike(Buffer), headTd: this.chain.headers.td.toArrayLike(Buffer), headHash: (_a = this.chain.headers.latest) === null || _a === void 0 ? void 0 : _a.hash(), headNum: (_b = this.chain.headers.latest) === null || _b === void 0 ? void 0 : _b.number.toArrayLike(Buffer), genesisHash: this.chain.genesis.hash }, serveOptions);
    }
    /**
     * Decodes ETH status message payload into a status object
     * @param {Object} status status message payload
     * @return {Object}
     */
    decodeStatus(status) {
        var _a, _b;
        this.isServer = !!status.serveHeaders;
        const mrc = {};
        if (status['flowControl/MRC']) {
            for (let entry of status['flowControl/MRC']) {
                entry = entry.map((e) => new sbr_util_1.BN(e).toNumber());
                mrc[entry[0]] = { base: entry[1], req: entry[2] };
                const message = this.messages.find((m) => m.code === entry[0]);
                if (message) {
                    mrc[message.name] = mrc[entry[0]];
                }
            }
        }
        return {
            networkId: new sbr_util_1.BN(status.networkId),
            headTd: new sbr_util_1.BN(status.headTd),
            headHash: status.headHash,
            headNum: new sbr_util_1.BN(status.headNum),
            genesisHash: status.genesisHash,
            serveHeaders: this.isServer,
            serveChainSince: (_a = status.serveChainSince) !== null && _a !== void 0 ? _a : 0,
            serveStateSince: (_b = status.serveStateSince) !== null && _b !== void 0 ? _b : 0,
            txRelay: !!status.txRelay,
            bl: status['flowControl/BL'] ? new sbr_util_1.BN(status['flowControl/BL']).toNumber() : undefined,
            mrr: status['flowControl/MRR'] ? new sbr_util_1.BN(status['flowControl/MRR']).toNumber() : undefined,
            mrc: mrc,
        };
    }
}
exports.LesProtocol = LesProtocol;
//# sourceMappingURL=lesprotocol.js.map