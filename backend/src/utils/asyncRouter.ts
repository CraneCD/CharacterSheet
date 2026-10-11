import express from 'express';

type Handler = (req: express.Request, res: express.Response, next: express.NextFunction) => unknown;

const METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;

/** Pass a handler's rejected promise (or thrown error) on to the error handler. */
function forwardErrors(handler: unknown): unknown {
    // Leave error handlers (4 arguments) and anything that isn't a function as they are
    if (typeof handler !== 'function' || handler.length === 4) return handler;
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const result = (handler as Handler)(req, res, next);
            if (result && typeof (result as Promise<unknown>).catch === 'function') (result as Promise<unknown>).catch(next);
        } catch (err) {
            next(err);
        }
    };
}

/**
 * express.Router() whose route handlers may be async. Express 4 ignores a rejected promise, and
 * Node then exits on the unhandled rejection, so one failed database call would take the API
 * down; here it reaches the error handler (a 500) instead.
 */
export function asyncRouter(options?: express.RouterOptions): express.Router {
    const router = express.Router(options);
    for (const method of METHODS) {
        const register = (router[method] as (...args: unknown[]) => unknown).bind(router);
        (router as unknown as Record<string, unknown>)[method] = (path: unknown, ...handlers: unknown[]) =>
            register(path, ...handlers.map(forwardErrors));
    }
    return router;
}
