import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const SignInForm = ({ handleSubmit, error }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor='email'>Email</label>
      <Field
        name='email'
        component='input'
        type='email'
        autocomplete='email'
      />
    </div>
    <div>
      <label htmlFor='password'>Password</label>
      <Field
        name='password'
        component='input'
        type='password'
        autocomplete='current-password'
      />
    </div>
    { error ? <div>{error}</div> : undefined }
    <button type='submit'>Submit</button>
  </form>
);

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.arraOf(PropTypes.string),
};

SignInForm.defaultProps = {
  error: [],
};

export default reduxForm({
  form: 'signin',
})(SignInForm);
