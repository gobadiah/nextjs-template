import axios from 'axios';
import Router from 'next/router';
import { hydrateStore, readEndpoint } from 'redux-json-api';

import config from '../config';
import { signedIn } from '../config/redux';

const handleUnauthorized = ({ err, res, asPath }) => {
  if (err.response.status !== 401) {
    throw err;
  } else if (res) {
    res.redirect(302, `/signin?returnUrl=${asPath}`);
  } else {
    Router.replace(`/signin?returnUrl=${asPath}`);
  }
};

export const readUsers = ({
  store,
  dispatch,
  res,
  asPath,
}) => {
  const ds = dispatch || store.dispatch;
  return ds(readEndpoint('users'))
    .catch(err => handleUnauthorized({ err, res, asPath }));
};

export const signin = dispatch => data => axios.post('/signin', data, config.axios({}))
  .then((result) => {
    dispatch(hydrateStore(result.data));
    dispatch(signedIn(result.data.data.id));
  });

export const register = ({ dispatch }) => data => axios.post('/auth/register', data, config.axios({ headers: { 'Content-Type': 'application/vnd.api+json' } }))
  .then((result) => {
    dispatch(hydrateStore(result.data));
    dispatch(signedIn(result.data.data.id));
  });
