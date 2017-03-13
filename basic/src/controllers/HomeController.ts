import {RestController, Get, Res, QueryParam, BeforeFilter, Data} from "typed-framework";
import * as Express from "express";
import {CurrentUser} from "../filters/CurrentUser";

@RestController()
@BeforeFilter(CurrentUser)
export class HomeController {

    @Get("/")
    public indexAction(@Data() data: any, @Res() res: Express.Response) {

        const currentUser = data.user;
        res.send(currentUser);
    }
}