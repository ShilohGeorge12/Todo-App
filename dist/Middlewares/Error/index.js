"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.ErrorBoundary = void 0;
function ErrorBoundary(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.ErrorBoundary = ErrorBoundary;
;
function ErrorHandler(error, req, res, next) {
    console.log('-> ', error.message);
    res.status(500).json({ error: `${error.message}` });
}
exports.ErrorHandler = ErrorHandler;
;
