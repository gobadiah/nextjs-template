import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import axios from 'axios';
import config from './index';

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${config.web}/auth/google/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    const data = {
      uid: profile.id,
      provider: 'google',
      access_token: accessToken,
    };
    axios.post('/auth/provider', data, config.axios({}))
      .then(result => done(null, result.data.data))
      .catch(err => done(err));
  },
));

passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${config.web}/auth/facebook/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    const data = {
      uid: profile.id,
      provider: 'facebook',
      access_token: accessToken,
    };
    axios.post('/auth/provider', data, config.axios({}))
      .then(result => done(null, result.data.data))
      .catch(err => done(err));
  },
));

export default passport;
