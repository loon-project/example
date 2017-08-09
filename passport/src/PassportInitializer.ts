import {IInitializer, Initialize} from "loon";
import * as Passport from 'passport';
import * as FacebookTokenStrategy from 'passport-facebook-token';


@Initialize()
export class PassportInitializer implements IInitializer {

  public init() {
    Passport.use(new FacebookTokenStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET
      }, function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({facebookId: profile.id}, function (error, user) {
          return done(error, user);
        });
      }
    ))
  }

}