"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RlpxServer = void 0;
const devp2p_1 = require("@sbr/devp2p");
const rlpxpeer_1 = require("../peer/rlpxpeer");
const server_1 = require("./server");
const ignoredErrors = new RegExp([
    // Peer socket connection
    'ECONNRESET',
    'EPIPE',
    'ETIMEDOUT',
    // ETH status handling
    'Genesis block mismatch',
    'NetworkId mismatch',
    'Unknown fork hash',
    // DPT message decoding
    'Hash verification failed',
    'Invalid address buffer',
    'Invalid timestamp buffer',
    'Invalid type',
    'Timeout error: ping',
    'Peer is banned',
    // ECIES message encryption
    'Invalid MAC',
    // Client
    'Handshake timed out',
    'Server already destroyed',
].join('|'));
/**
 * DevP2P/RLPx server
 * @emits connected
 * @emits disconnected
 * @emits error
 * @memberof module:net/server
 */
class RlpxServer extends server_1.Server {
    /**
     * Create new DevP2P/RLPx server
     * @param {RlpxServerOptions}
     */
    constructor(options) {
        var _a;
        super(options);
        this.peers = new Map();
        this.rlpx = null;
        this.dpt = null;
        this.ip = '::';
        // TODO: get the external ip from the upnp service
        this.ip = '::';
        this.discovery = options.config.discV4 || options.config.discDns;
        this.clientFilter = (_a = options.clientFilter) !== null && _a !== void 0 ? _a : [
            'go1.5',
            'go1.6',
            'go1.7',
            'quorum',
            'pirl',
            'ubiq',
            'gmc',
            'gwhale',
            'prichain',
        ];
    }
    /**
     * Server name
     * @type {string}
     */
    get name() {
        return 'rlpx';
    }
    /**
     * Return Rlpx info
     */
    getRlpxInfo() {
        // TODO: return undefined? note that this.rlpx might be undefined if called before initRlpx
        if (!this.rlpx) {
            return {
                enode: undefined,
                id: undefined,
                ip: this.ip,
                listenAddr: `[${this.ip}]:${this.config.port}`,
                ports: { discovery: this.config.port, listener: this.config.port },
            };
        }
        const id = this.rlpx._id.toString('hex');
        return {
            enode: `enode://${id}@[${this.ip}]:${this.config.port}`,
            id: id,
            ip: this.ip,
            listenAddr: `[${this.ip}]:${this.config.port}`,
            ports: { discovery: this.config.port, listener: this.config.port },
        };
    }
    /**
     * Start Devp2p/RLPx server. Returns a promise that resolves once server has been started.
     * @return Resolves with true if server successfully started
     */
    async start() {
        if (this.started) {
            return false;
        }
        await super.start();
        this.initDpt();
        this.initRlpx();
        this.started = true;
        // Boostrapping is technically not needed for a server start
        // (this is a repeated process) and setting `started` to `true`
        // before allows other services to resolve earlier and makes
        // the sync pick-up more reliable
        await this.bootstrap();
        return true;
    }
    /**
     * Bootstrap bootnode and DNS mapped peers from the network
     */
    async bootstrap() {
        var _a, _b;
        const self = this;
        // Bootnodes
        let promises = this.bootnodes.map((ma) => {
            const { address, port } = ma.nodeAddress();
            const bootnode = {
                address,
                udpPort: Number(port),
                tcpPort: Number(port),
            };
            return this.dpt.bootstrap(bootnode);
        });
        // DNS peers
        if (this.config.discDns) {
            const dnsPeers = (_b = (await ((_a = this.dpt) === null || _a === void 0 ? void 0 : _a.getDnsPeers()))) !== null && _b !== void 0 ? _b : [];
            promises = promises.concat(dnsPeers.map((node) => self.dpt.bootstrap(node)));
        }
        for (const promise of promises) {
            try {
                await promise;
            }
            catch (e) {
                this.error(e);
            }
        }
    }
    /**
     * Stop Devp2p/RLPx server. Returns a promise that resolves once server has been stopped.
     */
    async stop() {
        if (this.started) {
            this.rlpx.destroy();
            this.dpt.destroy();
            await super.stop();
            this.started = false;
        }
        return this.started;
    }
    /**
     * Ban peer for a specified time
     * @param  peerId id of peer
     * @param  [maxAge] how long to ban peer
     * @return True if ban was successfully executed
     */
    ban(peerId, maxAge = 60000) {
        if (!this.started) {
            return false;
        }
        this.dpt.banPeer(peerId, maxAge);
        return true;
    }
    /**
     * Handles errors from server and peers
     * @private
     * @param  error
     * @param  {Peer} peer
     * @emits  error
     */
    error(error, peer) {
        if (ignoredErrors.test(error.message)) {
            return;
        }
        if (peer) {
            peer.emit('error', error);
        }
        else {
            this.emit('error', error);
        }
    }
    /**
     * Initializes DPT for peer discovery
     * @private
     */
    initDpt() {
        this.dpt = new devp2p_1.DPT(this.key, {
            refreshInterval: this.refreshInterval,
            endpoint: {
                address: '0.0.0.0',
                udpPort: null,
                tcpPort: null,
            },
            shouldFindNeighbours: this.config.discV4,
            shouldGetDnsPeers: this.config.discDns,
            dnsRefreshQuantity: this.config.maxPeers,
            dnsNetworks: this.dnsNetworks,
            dnsAddr: this.config.dnsAddr,
        });
        this.dpt.on('error', (e) => this.error(e));
        if (this.config.port) {
            this.dpt.bind(this.config.port, '0.0.0.0');
        }
    }
    /**
     * Initializes RLPx instance for peer management
     * @private
     */
    initRlpx() {
        this.rlpx = new devp2p_1.RLPx(this.key, {
            dpt: this.dpt,
            maxPeers: this.config.maxPeers,
            capabilities: rlpxpeer_1.RlpxPeer.capabilities(Array.from(this.protocols)),
            remoteClientIdFilter: this.clientFilter,
            listenPort: this.config.port,
            common: this.config.chainCommon,
        });
        this.rlpx.on('peer:added', async (rlpxPeer) => {
            const peer = new rlpxpeer_1.RlpxPeer({
                config: this.config,
                id: rlpxPeer.getId().toString('hex'),
                host: rlpxPeer._socket.remoteAddress,
                port: rlpxPeer._socket.remotePort,
                protocols: Array.from(this.protocols),
                // @ts-ignore: Property 'server' does not exist on type 'Socket'.
                // TODO: check this error
                inbound: !!rlpxPeer._socket.server,
            });
            try {
                await peer.accept(rlpxPeer, this);
                this.peers.set(peer.id, peer);
                this.config.logger.debug(`Peer connected: ${peer}`);
                this.emit('connected', peer);
            }
            catch (error) {
                this.error(error);
            }
        });
        this.rlpx.on('peer:removed', (rlpxPeer, reason) => {
            const id = rlpxPeer.getId().toString('hex');
            const peer = this.peers.get(id);
            if (peer) {
                this.peers.delete(peer.id);
                this.config.logger.debug(`Peer disconnected (${rlpxPeer.getDisconnectPrefix(reason)}): ${peer}`);
                this.emit('disconnected', peer);
            }
        });
        this.rlpx.on('peer:error', (rlpxPeer, error) => {
            const peerId = rlpxPeer && rlpxPeer.getId();
            if (!peerId) {
                return this.error(error);
            }
            const id = peerId.toString('hex');
            const peer = this.peers.get(id);
            this.error(error, peer);
        });
        this.rlpx.on('error', (e) => this.error(e));
        this.rlpx.on('listening', () => {
            this.emit('listening', {
                transport: this.name,
                url: this.getRlpxInfo().enode,
            });
        });
        if (this.config.port) {
            this.rlpx.listen(this.config.port, '0.0.0.0');
        }
    }
}
exports.RlpxServer = RlpxServer;
//# sourceMappingURL=rlpxserver.js.map