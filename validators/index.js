import validateEmail from './email';

export const email = value => (validateEmail(value) ? undefined : 'Enter a valid email address.');

export const required = value => (value ? undefined : 'This field is required.');

export const minLength = min => value => (value && value.length >= min ? undefined : `Must be at least ${min} characters.`);

export const passwordConfirmation = (value, allValues) => (value === allValues.password ? undefined : 'Password doesn\'t match.');
