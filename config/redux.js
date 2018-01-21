import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import { reducer as api } from 'redux-json-api';

const initialState = {
  someKey: 5,
};

export const setState = {
  type: 'SET_STATE',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATE': return Object.assign({}, state, { someKey: 50 });
    default: return state;
  }
};

const authInitialState = {
  userId: null,
};

export const signedIn = userId => ({
  type: 'SIGNED_IN',
  payload: userId,
});

export const signedOut = {
  type: 'SIGNED_OUT',
};

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case 'SIGNED_IN':
      return Object.assign({}, state, {
        userId: action.payload,
      });
    case 'SIGNED_OUT':
      return Object.assign({}, state, {
        userId: null,
      });
    default:
      return state;
  }
};

const middlewares = composeWithDevTools(applyMiddleware(thunkMiddleware));

const rootReducer = combineReducers({
  app: reducer,
  auth: authReducer,
  form: formReducer,
  api,
});

// Auth

export default state => createStore(rootReducer, state, middlewares);
