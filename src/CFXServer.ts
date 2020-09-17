import axios, { AxiosResponse } from 'axios';
import InfoHelper, { InfoRaw } from './helpers/InfoHelper';

export interface CFXServerOptions {
    /**
     * A timeout (in ms) for an request
     */
    timeout: number;
}
export default class CFXServer {
    private base: URL;
    constructor(endpoint: string, private opts: CFXServerOptions) {
        this.base = new URL(endpoint);
    }

    // a basic method for creating and validating a URL
    private createUrl = (path: string) => new URL(path, this.base);

    private async performRequest<T>(
        url: URL,
        method: 'GET' | 'POST' = 'GET'
    ): Promise<T> {
        // perform the request
        const result = (await axios({
            url: url.toString(),
            method,
            timeout: this.opts.timeout,
        })) as AxiosResponse<T>;

        // return the data if it's valid
        if (result.status === 200) return result.data;
        // something went wrong
        throw new Error(
            `Unexpected result from server: HTTP Status Code ${result.status} (${result.statusText}); expected 200`
        );
    }

    /**
     * Performs a GET request at the CFX Server's `path`
     *
     * This is useful for custom resources exposing HTTP Servers
     * @param path The path of the endpoint (ie `/info.json`)
     */
    public async getPath<T = unknown>(path: string): Promise<T> {
        return this.performRequest(this.createUrl(path));
    }
    // TODO: Add POST method. Although it isn't top priority

    /* these are the easy wrapper methods (with types!) for the above func */

    public async getInfo(): Promise<InfoHelper> {
        const x = await this.getPath<InfoRaw>('/info.json');
        return new InfoHelper(x);
    }
    public getDynamic(): Promise<any> {
        return this.getPath('/dynamic.json');
    }

    /**
     * It depends on the server version and setup what this returns, use at your own risk
     *
     * Some return an html doc, some return a JSON object, some return a redirect...
     */
    public getIndex(): Promise<any> {
        return this.getPath('/');
    }
}
