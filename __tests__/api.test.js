import {
  handleUnauthorized,
  signin,
  register,
} from '../api';

describe('handleUnauthorized', () => {
  it('should re-throw the error if it doesn\'t have 401 response.status', () => {
    const err = {};
    expect(handleUnauthorized(err)).toThrow(err);
  });
});
