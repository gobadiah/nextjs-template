import React from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';

import RegistrationForm from '../forms/register';
import hoc from '../utils/hoc';
import { register } from '../api';

const Register = (props) => {
  const submit = (values) => {
    const data = {
      type: 'users',
      attributes: values,
    };
    const { registerUser } = props;
    return registerUser({ data }).catch((err) => {
      if (err.response.status === 400) {
        const errors = {
          ...err.response.data.errors,
          _error: err.response.data.errors.non_field_errors,
        };
        throw new SubmissionError(errors);
      }
    });
  };
  return (
    <RegistrationForm
      t={val => (Array.isArray(val) ? props.t(...val) : props.t(val))}
      onSubmit={submit}
    />
  );
};

Register.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  registerUser: register({ dispatch }),
});

export default hoc(['common'], null, mapDispatchToProps)(Register);
