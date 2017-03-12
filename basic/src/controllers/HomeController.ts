import {RestController, BeforeAction, Get, Res, QueryParam} from "typed-framework";
import {CurrentUser} from "../middlewares/CurrentUser";
import * as Express from "express";

@RestController()
@BeforeAction(CurrentUser)
export class HomeController {

    @Get("/")
    public indexAction(@Res() res: Express.Response,
                       @QueryParam('page') page: number,
                       @QueryParam('size') size: number) {

        const currentUser = res.locals.user;
        res.send(currentUser.name);
    }
}