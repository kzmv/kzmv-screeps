// type shim for nodejs' `require()` syntax
// for stricter node.js typings, remove this and install `@types/node`
declare const require: (module: string) => any;


declare interface CreepMemory {
    id: string;
    sourceId?: string;
    containerId?: string;
    home: string;
    targetRoom?: string;
    name: string;
    role: string;
    working: boolean;
}
// add your custom typings here
