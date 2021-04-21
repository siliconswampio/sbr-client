"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RlpxSender = void 0;
const sender_1 = require("./sender");
/**
 * DevP2P/RLPx protocol sender
 * @emits message
 * @emits status
 * @memberof module:net/protocol
 */
class RlpxSender extends sender_1.Sender {
    /**
     * Creates a new DevP2P/Rlpx protocol sender
     * @param {Object} rlpxProtocol protocol object from @sbr/devp2p
     */
    constructor(rlpxProtocol) {
        super();
        this.sender = rlpxProtocol;
        this.sender.on('status', (status) => {
            this.status = status;
        });
        this.sender.on('message', (code, payload) => {
            this.emit('message', { code, payload });
        });
    }
    /**
     * Send a status to peer
     * @param  {Object} status
     */
    sendStatus(status) {
        try {
            this.sender.sendStatus(status);
        }
        catch (err) {
            this.emit('error', err);
        }
    }
    /**
     * Send a message to peer
     * @param  {number} code message code
     * @param  {*}      data message payload
     */
    sendMessage(code, data) {
        try {
            //@ts-ignore "type number is not assignable to type never"
            this.sender.sendMessage(code, data);
        }
        catch (err) {
            this.emit('error', err);
        }
    }
}
exports.RlpxSender = RlpxSender;
//# sourceMappingURL=rlpxsender.js.map