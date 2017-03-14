import {RestController, Get, Res, BeforeFilter, Data, Next} from "typed-framework";
import * as Express from "express";
import {CurrentUser} from "../filters/CurrentUser";

@RestController()
@BeforeFilter(CurrentUser)
export class HomeController {

    @Get("/")
    public indexAction(@Data() data: any, @Res() res: Express.Response) {
        res.send(data);
    }

    @Get("/404")
    public errorAction(@Next() next: Express.NextFunction) {
        try {
            throw new Error("404 page");
        } catch(e) {
            next(e);
        }
    }
}