import * as Express from "express";
import {Next, Filter, IMiddleware, Data} from "typed-framework";
import {UserService} from "../services/UserService";

@Filter()
export class CurrentUser implements IMiddleware {

    constructor(private userService: UserService) {
    }

    public use(@Data() data: any, @Next() next: Express.NextFunction) {

        data.user = this.userService.findById(1);

        next();
    }
}
