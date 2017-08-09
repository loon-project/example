import {ApplicationSettings, ApplicationLoader} from 'loon';
import * as FacebookTokenStrategy from 'passport-facebook-token';


@ApplicationSettings({
  rootDir: `${__dirname}/../`
})
class Application extends ApplicationLoader {


  public static initialize() {
    return new Application().start();
  }

}


Application.initialize();