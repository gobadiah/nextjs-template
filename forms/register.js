import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import {
  email,
  required,
  minLength,
  passwordConfirmation,
} from '../validators';

const renderField = ({
  input,
  label,
  type,
  name,
  t,
  meta: {
    touched,
    error,
    warning,
  },
}) => (
  <div>
    <label htmlFor={name}>{t(label)}</label>
    <div>
      <input {...input} placeholder={t(label)} type={type} />
      {touched && ((error && <span>{t(error)}</span>) ||
        (warning && <span>{t(warning)}</span>))}
    </div>
  </div>
);

renderField.propTypes = {
  input: PropTypes.shape().isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  meta: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
};

const minLength8 = minLength(8);

const RegistrationForm = (props) => {
  const {
    t,
    error,
    handleSubmit,
    submitting,
    pristine,
    reset,
  } = props;
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <Field
          label="Email"
          name="email"
          component={renderField}
          type="email"
          t={t}
          validate={[email, required]}
        />
      </div>
      <div>
        <Field
          name="password"
          label="Password"
          component={renderField}
          type="password"
          t={t}
          validate={[required, minLength8]}
        />
      </div>
      <div>
        <Field
          name="confirm_password"
          label="Password confirmation"
          component={renderField}
          type="password"
          t={t}
          validate={[required, passwordConfirmation]}
        />
      </div>
      <div>
        <Field
          label="First name"
          name="first_name"
          component={renderField}
          type="text"
          t={t}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          label="Last name"
          name="last_name"
          component={renderField}
          type="text"
          t={t}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          label="Birthday"
          name="birthday"
          component={renderField}
          type="date"
          t={t}
          validate={[required]}
        />
      </div>
      {error && (Array.isArray(error) ? error.map(err => <div>{err}<br /></div>)
        : <div>{error}<br /></div>)}
      <div>
        <button type="submit" disabled={submitting}>{t('Send')}</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>{t('Clear Values')}</button>
      </div>
    </form>
  );
};

RegistrationForm.defaultProps = { error: undefined };

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'registration',
})(RegistrationForm);
