import {Middleware, IMiddleware, Data, Next} from "typed-framework";
import * as Express from 'express';

@Middleware({order: 1})
export class Middleware2 implements IMiddleware {

    public use(@Data() data: any, @Next() next: Express.NextFunction) {

        if (typeof data.order === 'undefined') {
            data.order = [];
        }

        data.order.push('Middleware2');
        next();
    }
}