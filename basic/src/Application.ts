import {TypedApplicationLoader, TypedApplication, Inject} from "typed-framework";

@TypedApplicationLoader({rootDir: `${__dirname}/../`})
class Application {

    @Inject(8080)
    private port: number;

    public static start() {
        TypedApplication.run();
    }

}

Application.start();

