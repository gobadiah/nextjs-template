import withRedux from 'next-redux-wrapper';
import { translate } from 'react-i18next';
import {
  setAxiosConfig,
  readEndpoint } from 'redux-json-api';

import initStore, { signedIn } from '../config/redux';
import i18n from '../config/i18n';
import config from '../config';

const reducePromises = (promises, args, ns) => Promise.all(promises.map(p => p({ ns, ...args })))
  .then(values => Object.assign(...values));

const i18nInitialProps = ({ req, ns }) => new Promise((resolve) => {
  if (req && !process.browser) {
    resolve(i18n.getInitialProps(req, ns));
  } else {
    resolve({});
  }
});

const setupApi = ({ req, store }) => {
  store.dispatch(setAxiosConfig(config.axios({ req })));
  return {};
};

const getMe = ({ store }) => store.dispatch(readEndpoint('/users/me'))
  .then((result) => {
    store.dispatch(signedIn(result.body.data.id));
  })
  .catch(() => {});

export default (ns, mapStateToProps, mapDispatchToProps, initialProps = []) => (component) => {
  // eslint-disable-next-line no-param-reassign
  component.getInitialProps = args => reducePromises([
    i18nInitialProps,
    setupApi,
    getMe,
    ...initialProps,
  ], args, ns);
  return withRedux(
    initStore,
    mapStateToProps,
    mapDispatchToProps,
  )(translate(ns, { i18n, wait: process.browser })(component));
};
