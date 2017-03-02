import * as Express from "express";
import IRequest from "../interfaces/IRequest";
import {Component, Middleware} from "typed-framework";
import UserService from "../services/UserService";

@Component()
export class CurrentUser implements Middleware {

    constructor(private userService: UserService) {
    }

    public async use(request: IRequest, response: Express.Response, next: Express.NextFunction): Promise<any> {

        const userId = request.cookies['user_id'];

        request.currentUser = await this.userService.findById(userId);

        next();

        return null;
    }
}
