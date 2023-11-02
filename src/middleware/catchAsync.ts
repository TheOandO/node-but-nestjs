import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class catchAsync implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const fn = (req, res, next) => {
            return Promise.resolve()
            .then(() => {
                fn(req, res, next);
            })
            .catch(err => {
                next(err);
            });
        };

        return fn(req, res, next);
    };
}