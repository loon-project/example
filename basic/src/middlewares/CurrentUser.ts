import * as Express from "express";
import {Middleware, Req, Res, Next} from "typed-framework";
import {IMiddleware} from "typed-framework/dts/mvc/interface/Middleware";
import {UserService} from "../services/UserService";

@Middleware()
export class CurrentUser implements IMiddleware {

    constructor(private userService: UserService) {
    }

    public use(@Req() req: Express.Request, @Res() res: Express.Response, @Next() next: Express.NextFunction) {

        const userId = req.cookies['user_id'];

        res.locals.user = this.userService.findById(1);

        next();
    }
}
