import * as Express from "express";
import {Next, Filter, IMiddleware, Data} from "typed-framework";
import {UserService} from "../services/UserService";

@Filter()
export class CurrentUser implements IMiddleware {

    constructor(private userService: UserService) {
    }

    public async use(@Data() data: any, @Next() next: Express.NextFunction) {

        data.user = await this.userService.findById(1);

        next();
    }
}
