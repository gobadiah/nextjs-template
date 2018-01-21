import React from 'react';
import Router from 'next/router';

import SignInForm from '../forms/signin';
import hoc from '../utils/hoc';
import { signin } from '../api';

const SignIn = () => {
  const submit = (values) => {
    const data = values;

    signin(data).catch((err) => {
      console.warn('Error signing in');
      console.warn(err);
    })
      .then((result) => {
        console.log(Router);
        const target = Router.router.query.returnUrl || '/';
        Router.replace(target);
        console.log(result);
      });
  };
  return <SignInForm onSubmit={submit} />;
};

export default hoc([], null, null)(SignIn);
