import {Middleware, IMiddleware, Data, Next} from "typed-framework";
import * as Express from 'express';

@Middleware({order: 0})
export class Middleware1 implements IMiddleware {

    public use(@Data() data: any, @Next() next: Express.NextFunction) {

        if (typeof data.order === 'undefined') {
            data.order = [];
        }

        data.order.push('Middleware1');

        next();
    }
}
