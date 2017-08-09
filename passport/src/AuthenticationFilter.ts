import {Filter, IMiddleware} from "loon";
import * as Passport from 'passport';

@Filter()
export class AuthenticationFilter implements IMiddleware {

  public use(...args) {
    Passport.authenticate('facebook-token');
  }

}