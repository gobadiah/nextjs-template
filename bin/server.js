import { URL } from 'url';
import path from 'path';
import express from 'express';
import proxy from 'express-http-proxy';
import cookieParser from 'cookie-parser';
import next from 'next';

import backend from 'i18next-node-fs-backend';
import i18nextMiddleware, { LanguageDetector } from 'i18next-express-middleware';

import i18n from '../config/i18n';
import config from '../config';
import passport from '../config/passport';

const dev = config.debug;
const app = next({ dev });
const handle = app.getRequestHandler();

i18n.use(LanguageDetector)
  .use(backend)
  .init({
    preload: ['en', 'fr'],
    ns: ['index', 'common'],
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.missing.json'),
      jsonIndent: 2,
    },
  }, () => {
    app.prepare()
      .then(() => {
        const server = express();

        server.use('/api', proxy(config.api));

        server.use(cookieParser());

        server.use(passport.initialize());

        server.get(
          '/auth/google',
          passport.authenticate(
            'google',
            {
              session: false,
              scope: config.google.scope,
            },
          ),
        );

        server.get(
          '/auth/google/callback',
          passport.authenticate(
            'google',
            {
              failureRedirect: '/signin',
              session: false,
            },
          ),
          (req, res) => res.redirect('/'),
        );

        server.get('/auth/facebook', passport.authenticate(
          'facebook',
          { scope: config.facebook.scope },
        ));
        server.get(
          '/auth/facebook/callback',
          passport.authenticate(
            'facebook',
            {
              session: false,
              successRedirect: '/',
              failureRedirect: '/signin',
            },
          ),
        );

        server.use(i18nextMiddleware.handle(i18n));

        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));
        server.use('/locales', express.static(path.join(__dirname, '../locales')));

        server.get('/signout', (req, res) => {
          res.clearCookie('access_token');
          const target = (!req.get('Referrer') || (new URL(req.get('Referrer'))).pathname === '/signout') ? '/' : req.get('Referrer');
          res.redirect(302, target);
        });

        server.get('*', handle);

        server.use((err, req, res) => {
          // eslint-disable-next-line no-console
          console.log('SERVER ERROR !!');
          // eslint-disable-next-line no-console
          console.error(err);
          res.status(500).send('No way jose');
        });

        server.listen(config.port, (err) => {
          if (err) throw err;
          // eslint-disable-next-line no-console
          console.log(`> Read on http://localhost:${config.port}`);
        });
      });
  });
