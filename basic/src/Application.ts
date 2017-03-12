import {ApplicationLoader, ApplicationSettings} from "typed-framework";


@ApplicationSettings({rootDir: `${__dirname}/../`})
class Application extends ApplicationLoader {

    public static initialize() {
        return new Application().start();
    }
}

Application
    .initialize()
    .catch(e => {
        throw e
    });


