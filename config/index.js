import cookie from 'cookie';

const port = parseInt(process.env.PORT, 10) || 3000;
const web = process.env.WEB_URL || `http://127.0.0.1:${port}`;
const api = process.browser ? `${web}/api` : process.env.API_URL || 'http://127.0.0.1:8000';


export default {
  debug: process.env.NODE_ENV !== 'production',
  port,
  web,
  api,
  axios: ({ req, headers }) => {
    const newHeaders = headers || {};
    if (req) {
      const cookies = Object.keys(req.cookies).map(key => cookie.serialize(key, req.cookies[key])).join('; ');
      newHeaders.Cookie = cookies;
    }
    return {
      baseURL: api,
      withCredentials: true,
      headers: newHeaders,
    };
  },
  google: {
    scope: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/user.birthday.read',
      'https://www.googleapis.com/auth/user.emails.read',
      'https://www.googleapis.com/auth/user.phonenumbers.read',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  },
  facebook: {
    scope: ['email', 'user_birthday'],
  },
};
