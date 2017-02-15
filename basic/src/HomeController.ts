import {RestController, Get} from "typed-framework";

@RestController("")
export class HomeController {

    @Get("/")
    public indexAction() {

        return {
            framework: 'typed-framework'
        }

    }

}