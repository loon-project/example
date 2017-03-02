import {TypedApplicationLoader, TypedApplication} from "typed-framework";

@TypedApplicationLoader({rootDir: `${__dirname}/../`})
class Application {

    public static start() {
        TypedApplication.run();
    }

}

Application.start();

