import CFXServer, { CFXServerOptions } from './CFXServer';

/**
 * These are the default options for the "initiate" function
 */
const DEFAULT_OPTIONS: CFXServerOptions = {
    timeout: 5000,
};

/**
 * Creates an instance of the CFXServer object
 * @param ip The IP of the CFX Server
 * @param options Any additional options
 */
export default function initiate(
    ip: string,
    options?: Partial<CFXServerOptions>
): CFXServer {
    // combine the default options and the user-provided ones
    const opts: CFXServerOptions = Object.assign(
        DEFAULT_OPTIONS,
        options ?? {}
    );

    // create the CFXServer instance
    return new CFXServer(ip, opts);
}

export { CFXServer, CFXServerOptions };
