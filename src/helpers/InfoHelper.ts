// these are known types for the variables for the `/info.json` file
export type InfoRawVars = {
    gamename: 'gta5' | 'redm';
    locale?: string;
    onesync_enabled: 'true' | 'false';
    sv_lan: 'true' | 'false';
    sv_licenseKeyToken: string;
    sv_maxClients: string;
    sv_scriptHookAllowed: 'true' | 'false';
    tags: string;
};

// this is what the info.json should parse to
export type InfoRaw = {
    enhancedHostSupport: boolean;
    icon?: string;
    resources: string[];
    server: string;
    vars: InfoRawVars & { [key: string]: string };
    version: number;
};

/**
 * A wrapper class for the `/info.json` endpoint
 */
export default class InfoHelper {
    constructor(public readonly raw: InfoRaw) {}

    /**
     * Retrieves a server-set variable from the info.json
     * @param key The key of the key-value pair
     */
    public getVariable(key: keyof InfoRawVars | string) {
        return this.raw.vars[key];
    }

    /**
     * The max number of clients in the server
     */
    public get maxClientCount(): number {
        return Number.parseInt(this.raw.vars.sv_maxClients, 10);
    }

    /**
     * The server's icon, or `null` if not set
     */
    public get icon(): Buffer | null {
        const icon = this.raw.icon;
        return icon ? Buffer.from(icon, 'base64') : null;
    }

    /**
     * The tags of the CFX Server
     */
    public get tags(): string[] {
        return this.raw.vars.tags.split(/, /g);
    }

    /**
     * The current artifact version of the server
     */
    public get artifactVersion(): number | null {
        const m = this.raw.server.match(/v1\.0\.0\.(\d+)/);
        return m ? Number.parseInt(m[1], 10) : null;
    }
}
