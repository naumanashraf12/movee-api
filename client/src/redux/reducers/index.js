import { combineReducers } from "redux";
import { clearErrors } from "../actions/authAction";
import {
  CLEAR_ERRORS,
  CODE_FAIL,
  CODE_REQUEST,
  CODE_SUCCESS,
  FORGETPASSWORD_SUCCESS,
  FORGOTPASSWORD_FAIL,
  FORGOTPASSWORD_REQUEST,
  HISTORY_FAIL,
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
  PLAN_FAIL,
  PLAN_REQUEST,
  PLAN_SUCCESS,
  RESETPASSWORD_FAIL,
  RESETPASSWORD_REQUEST,
  RESETPASSWORD_SUCCESS,
  SUBSCRIPTION_FAIL,
  SUBSCRIPTION_REQUEST,
  SUBSCRIPTION_SUCCESS,
  UPDATE_USER_ORGINIZATION_FAIL,
  UPDATE_USER_ORGINIZATION_REQUEST,
  UPDATE_USER_ORGINIZATION_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  VIRIFYOPT_FAIL,
  VIRIFYOPT_REQUEST,
  VIRIFYOPT_SUCCESS,
} from "../constants";
import { authReducer } from "./authReducer";

const updatePassword = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_PASSWORD_REQUEST:
      return { ...state, loading: true, updated: null };
    case UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        updated: true,
        loading: false,
        message: action.payload,
      };
    case UPDATE_USER_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        updated: false,

        message: action.payload,
      };
    default:
      return state;
  }
};
const updateOrganization = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_ORGINIZATION_REQUEST:
      return { ...state, loadingOrg: true, updateOrg: null };
    case UPDATE_USER_ORGINIZATION_SUCCESS:
      return {
        ...state,
        updateOrg: true,
        loadingOrg: false,
        messageOrg: action.payload,
      };
    case UPDATE_USER_ORGINIZATION_FAIL:
      return {
        ...state,
        loadingOrg: false,
        updateOrg: false,

        messageOrg: action.payload,
      };
    default:
      return state;
  }
};
const forgetPassword = (state = {}, action) => {
  switch (action.type) {
    case FORGOTPASSWORD_REQUEST:
      return { ...state, loading: true, sent: false };
    case FORGETPASSWORD_SUCCESS:
      return {
        ...state,
        sent: true,
        loading: false,
        message: action.payload.message,
        email: action.email,
      };
    case FORGOTPASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        sent: false,

        message: action.payload,
      };

    default:
      return state;
  }
};
const verifyOpt = (state = {}, action) => {
  switch (action.type) {
    case VIRIFYOPT_REQUEST:
      return { ...state, loading: true, verify: false, error: null };
    case VIRIFYOPT_SUCCESS:
      return {
        ...state,
        verify: true,
        loading: false,
        message: action.payload.message,
      };
    case VIRIFYOPT_FAIL:
      return {
        ...state,
        loading: false,
        verify: false,
        error: action.payload,
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
const ResetPassword = (state = {}, action) => {
  switch (action.type) {
    case RESETPASSWORD_REQUEST:
      return { ...state, loading: true, reseted: false, error: null };
    case RESETPASSWORD_SUCCESS:
      return {
        ...state,
        reseted: true,
        loading: false,
        message: action.payload.message,
      };
    case RESETPASSWORD_FAIL:
      return {
        ...state,
        message: null,
        loading: false,
        reseted: false,
        error: action.payload,
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
const subscription = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_REQUEST:
      return { ...state, loading: true, error: null };
    case SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.status,
      };
    case SUBSCRIPTION_FAIL:
      return {
        ...state,
        message: null,
        loading: false,

        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        message: null,
        error: null,
      };

    default:
      return state;
  }
};
const historyy = (state = {}, action) => {
  switch (action.type) {
    case HISTORY_REQUEST:
      return { ...state, loading: true, error: null };
    case HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.billingHistory,
      };
    case HISTORY_FAIL:
      return {
        ...state,
        message: null,
        loading: false,

        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        message: null,
        data: null,
        error: null,
      };

    default:
      return state;
  }
};
const movee = (state = {}, action) => {
  switch (action.type) {
    case CODE_REQUEST:
      return { ...state, loading: true, error: null };
    case CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.Document,
      };
    case CODE_FAIL:
      return {
        ...state,
        message: null,
        loading: false,

        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        message: null,
        data: null,
        error: null,
      };

    default:
      return state;
  }
};
const plans = (state = {}, action) => {
  switch (action.type) {
    case PLAN_REQUEST:
      return { ...state, loading: true, error: null };
    case PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        plans: action.payload.plans,
      };
    case PLAN_FAIL:
      return {
        ...state,
        message: null,
        loading: false,

        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        message: null,
        plans: null,
        error: null,
      };

    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
  password: updatePassword,
  orginization: updateOrganization,
  ottp: forgetPassword,
  verify: verifyOpt,
  reset: ResetPassword,
  sub: subscription,
  his: historyy,
  code: movee,
  plan: plans,
});
