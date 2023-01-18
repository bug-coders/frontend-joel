import { ADVERTS_LOADED, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from './types.js';

const defaultState = {
  auth: false,
  adverts: [],
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function adverts(state = defaultState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED:
      return action.payload;
    default:
      return state;
  }
}

/* export default function reducer(state = defaultState, action) {
  return {
    auth: auth(state.auth, action),
    adverts: adverts(state.adverts, action),
  };
} */
