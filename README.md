# Nextjs project template

This is a base project supposed to be working with a [json api](http://jsonapi.org), with sign in, sign out and registration already built in.

## Technologies

* [nextjs](https://github.com/zeit/next.js/) wonderful framework that takes care of server-side rendering, all the webpack mess, and comes with many other great features.
* [i18next](https://www.i18next.com/) for internationalization.
* [redux](https://redux.js.org/) for state management.
* [redux-json-api](https://github.com/stonecircle/redux-json-api) for communicating with the json api `application/vnd.api+json`.
* [passport](passportjs.org) for social login.
* [emotion](https://emotion.sh/) for styling.
* And of course ... [react](https://reactjs.org/)

## Usage

### Development

#### On Macos

* `brew install node`
* `npm install -g npx`
* `brew install yarn`
* `yarn install`
* Linting in [neovim](https://neovim.io/), add these lines to `~/.config/nvim/init.vim`:

```
let g:neomake_javascript_enabled_makers = ['eslint']
let g:neomake_javascript_eslint_maker = {
    \ 'args': ['eslint', '-f', 'compact'],
    \ 'errorformat': '%E%f: line %l\, col %c\, Error - %m,' .
                 \   '%W%f: line %l\, col %c\, Warning - %m,%-G,%-G%*\d problems%#',
    \ 'exe': '/usr/local/bin/npx',
    \ }
 
``` 
, autocompletion using [deoplete](https://github.com/Shougo/deoplete.nvim) (with [vim-plug](https://github.com/junegunn/vim-plug)) : 
 
```
Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
let g:deoplete#enable_at_startup = 1
set completeopt=longest,menuone
```
, and syntax highlighting :

```
Plug 'elzr/vim-json', { 'for': 'json' }
Plug 'pangloss/vim-javascript', { 'for': 'javascript' }
Plug 'mxw/vim-jsx'
let g:jsx_ext_required = 0
```

##### Run the server

* In development mode: `npm run dev`
* In production mode: `npm run build && npm run start`

### Production

We use a docker image for production. 

To build it: `WEB_URL=https://www.project.com IMAGE=project/web TAG=production ./bin/docker_build`

API calls are done through a proxy `https://www.project.com/api`, `IMAGE` can be anythong you want, but `project/web` is cool. `TAG` can be anything as well. 

### Configuration

Several environment variables are used :

* `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for [Google Sign-In](https://developers.google.com/identity/sign-in/web/).
* `FACEBOOK_CLIENT_ID` and `FACEBOOK_CLIENT_SECRET` for [Facebook Sign-In](https://developers.facebook.com/docs/facebook-login/web)

Both these sign-in methods are handled by [passport](www.passportjs.org). They both can be used locally if you have `http://127.0.0.1:3000` set as possible host in your facebook and google app, as well as `http://127.0.0.1:3000/auth/(google|facebook)/callback` as callbacks.

* `PORT` defaults to `3000`, Heroku use it for instance to set up the listening port.
* `WEB_URL` should be the url of the web server (where this instance is located).
* `API_URL` is where the api is located.
* `NODE_ENV` is set to production when building the docker image.

### Testing

We use [jest](https://facebook.github.io/jest/).
