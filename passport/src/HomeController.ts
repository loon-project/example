import {RestController, Get, Res, Response, BeforeFilter} from 'loon';
import {AuthenticationFilter} from "./AuthenticationFilter";

@RestController("/")
@BeforeFilter(AuthenticationFilter)
export class HomeController {

  @Get("")
  public indexAction(@Res() res: Response) {
    res.send("Hello world");
  }

}