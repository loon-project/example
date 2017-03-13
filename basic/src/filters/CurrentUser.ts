import * as Express from "express";
import {Req, Res, Next, Filter, IMiddleware} from "typed-framework";
import {UserService} from "../services/UserService";

@Filter()
export class CurrentUser implements IMiddleware {

    constructor(private userService: UserService) {
    }

    public use(@Req() req: Express.Request, @Res() res: Express.Response, @Next() next: Express.NextFunction) {

        const userId = req.cookies['user_id'];

        res.locals.user = this.userService.findById(1);

        next();
    }
}
