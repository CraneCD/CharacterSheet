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
