import {RestController, Get, Res, QueryParam, BeforeFilter} from "typed-framework";
import * as Express from "express";
import {CurrentUser} from "../filters/CurrentUser";

@RestController()
@BeforeFilter(CurrentUser)
export class HomeController {

    @Get("/")
    public indexAction(@Res() res: Express.Response,
                       @QueryParam('page') page: number,
                       @QueryParam('size') size: number) {

        const currentUser = res.locals.user;
        res.send(currentUser);
    }
}