/// <reference types="node" />
/// <reference types="express" />

declare var process: {
    env: {
        [key: string]: string | undefined;
        PORT?: string;
        JWT_SECRET?: string;
        DATABASE_URL?: string;
        NODE_ENV?: string;
    };
};

declare var console: {
    log(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
};

// Render installs with NODE_ENV=production, which skips @types/node (the
// lockfile marks it dev-only), so Node built-ins the build imports need a
// declaration here. Keep these to what the code uses.
declare module 'crypto' {
    export function randomInt(max: number): number;
}
