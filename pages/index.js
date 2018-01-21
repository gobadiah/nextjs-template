import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { setState } from '../config/redux';

import hoc from '../utils/hoc';

const Index = (props) => {
  const { t } = props;
  const { someKey } = props;

  const val = someKey * 2;

  return (
    <div>
      {t('index:welcome')}
      {t('index:hello-world')}
      {t('index:bye-world')}
      {val}
      <Link href="/contact">
        <a>Contact Form</a>
      </Link>
      <Link href="/users?some=value">
        <a>See the api</a>
      </Link>
      <Link href="/signup">
        <a>SignUp</a>
      </Link>
      <Link href="/signin">
        <a>SignIn</a>
      </Link>
      <Link href="/signout">
        <a>SignOut</a>
      </Link>
    </div>
  );
};

Index.propTypes = {
  someKey: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => ({});
const mapStateToProps = state => state.app;

const initialDispatch = ({ store }) => {
  store.dispatch(setState);
  return {};
};

const ns = ['index', 'common'];

export default hoc(ns, mapStateToProps, mapDispatchToProps, [initialDispatch])(Index);
