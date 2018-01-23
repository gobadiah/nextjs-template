jest.mock('next/router');

import {
  handleUnauthorized,
  signin,
  register,
} from '../api';

describe('handleUnauthorized', () => {
  it('should re-throw the error if it doesn\'t have 401 response.status', () => {
    const err = new Error('Hello world');
    expect(() => handleUnauthorized({ err })).toThrow(err);
  });
  it('should response redirect if status is 401 on the server side', () => {
    const err = new Error('No way jose');
    err.response = { status: 401 };
    const res = { redirect: jest.fn() };
    const asPath = '/path';
    handleUnauthorized({ err, res, asPath });
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe(302);
    expect(res.redirect.mock.calls[0][1]).toBe(`/signin?returnUrl=${asPath}`);
  });
  it('should Router redirect if status is 401 on the client side (no res)', () => {
    const err = new Error('No way jose');
    err.response = { status: 401 };
    const asPath = '/path';
    const Router = require('next/router');
    const handleUnauthorized = require('../api').handleUnauthorized;
    handleUnauthorized({ err, asPath });
    expect(Router.default.replace.mock.calls.length).toBe(1);
    expect(Router.default.replace.mock.calls[0][0]).toBe(`/signin?returnUrl=${asPath}`);
  });
});
