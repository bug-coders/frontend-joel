import {
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_DELETED_SUCCESS,
  ADVERT_EDITED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  API_TAGS_LOADED_SUCCESS,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  UI_RESET_ERROR,
  USER_LOGGED,
  USER_LOGOUT,
} from './types.js';

export const defaultState = {
  auth: false,
  adverts: {
    areLoaded: false,
    data: [],
    apiTags: [],
  },
  user: {
    data: {},
  },
  ui: {
    isLoading: false,
    error: null,
  },
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
}

export function adverts(state = defaultState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return { ...state, areLoaded: true, data: action.payload.result.rows };
    case ADVERT_LOADED_SUCCESS:
      return { ...state, data: [action.payload] };
    case ADVERT_CREATED_SUCCESS:
      return { ...state, data: [...state.data, action.payload] };
    case ADVERT_EDITED_SUCCESS:
      return { ...state, areLoaded: false, data: [...state.data, action.payload] };
    case ADVERT_DELETED_SUCCESS:
      const deletedAdvertList = state.data.filter((advert) => {
        return advert._id !== action.payload._id;
      });
      return { ...state, data: deletedAdvertList };
    case API_TAGS_LOADED_SUCCESS:
      return { ...state, apiTags: action.payload.result };
    default:
      return state;
  }
}

export function user(state = defaultState.user, action) {
  switch (action.type) {
    case USER_LOGGED:
      return { ...state, data: action.payload };
    case USER_LOGOUT:
      return { ...state, data: {} };
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return { isLoading: false, error: action.payload };
  }

  if (/_REQUEST$/.test(action.type)) {
    return { isLoading: true, error: null };
  }

  if (/_SUCCESS$/.test(action.type)) {
    return { isLoading: false, error: null };
  }

  if (action.type === UI_RESET_ERROR) {
    return { ...state, error: null };
  }

  return state;
}
