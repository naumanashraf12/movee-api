import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  CLEAR_ERRORS,
} from "../constants/index";
export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        isAuthenticated: false,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        isAuthenticated: true,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        profile: null,
        // error: action.payload,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGNUP_USER_REQUEST:
      return {
        ...state,
        loading: true,
        registered: false,
      };

    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        registered: true,
      };

    case SIGNUP_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        registered: false,
      };
    case "REGITERED":
      return {
        ...state,
        registered: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
