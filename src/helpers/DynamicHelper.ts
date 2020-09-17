// the raw data
export type DynamicRaw = {
    clients: number;
    gametype: string;
    hostname: string;
    iv: string;
    mapname: string;
    sv_maxclients: string;
};

export default class DynamicHelper {
    constructor(public readonly raw: DynamicRaw) {}

    /**
     * The server name, as shown in the server list
     */
    public get serverName() {
        return this.raw.hostname;
    }

    /**
     * The name of the current map of the server
     */
    public get mapName() {
        return this.raw.mapname;
    }

    /**
     * The number of clients currently connected to the server
     */
    public get numClients() {
        return this.raw.clients;
    }

    /**
     * The max number of clients that can connect to the server
     */
    public get maxNumClients() {
        return Number.parseInt(this.raw.sv_maxclients);
    }
}
