import {IMiddleware, ErrorMiddleware, Err, Res} from "typed-framework";
import * as Express from 'express';

@ErrorMiddleware()
export class ErrMiddleware implements IMiddleware {

    public use(@Err() err: any, @Res() res: Express.Response) {
        res.send(err.message);
    }
}