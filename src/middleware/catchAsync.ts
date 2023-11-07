import { Request, Response, NextFunction } from 'express';

export function catchAsync(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
    // Wrap the asynchronous function using a try-catch block
    try {
        next(); // Call `next` to continue to the next middleware
    } catch (error) {
        next(error); // Pass any errors to the global error handler
    }
}