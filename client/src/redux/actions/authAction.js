import {
  getLoadUser,
  postLogin,
  signup,
  updatePassword,
  updateOrginization as newOrganization,
  ottpRequest,
  ottpVerify,
  resetedpassword,
  subs,
  his,
  postc,
  plans,
} from "../../api";
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
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  PLAN_FAIL,
  PLAN_REQUEST,
  PLAN_SUCCESS,
  RESETPASSWORD_FAIL,
  RESETPASSWORD_REQUEST,
  RESETPASSWORD_SUCCESS,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
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
} from "../constants/index";

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const { data } = await postLogin(username, password);
      console.log(data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await getLoadUser();
    console.log(data);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data?.user,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const signUp = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_USER_REQUEST });

    const { data } = await signup(userData);
    console.log(data);

    dispatch({
      type: SIGNUP_USER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SIGNUP_USER_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const registeredUser = () => async (dispatch) => {
  dispatch({
    type: "REGITERED",
  });
};

export const updateUserPassword = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_PASSWORD_REQUEST });

    const { data } = await updatePassword(formData);

    dispatch({
      type: UPDATE_USER_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PASSWORD_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
export const updateOrginization = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_ORGINIZATION_REQUEST });

    const { data } = await newOrganization(formData);

    dispatch({
      type: UPDATE_USER_ORGINIZATION_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_USER_ORGINIZATION_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
export const forgotPassword = (formData) => async (dispatch) => {
  try {
    dispatch({ type: FORGOTPASSWORD_REQUEST });

    const { data } = await ottpRequest(formData);
    console.log(data);

    dispatch({
      type: FORGETPASSWORD_SUCCESS,
      payload: data,
      email: formData.email,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FORGOTPASSWORD_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
export const verifyOpt = (formData) => async (dispatch) => {
  try {
    dispatch({ type: VIRIFYOPT_REQUEST });

    const { data } = await ottpVerify(formData);
    dispatch({
      type: VIRIFYOPT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: VIRIFYOPT_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
export const resetpassword = (formData) => async (dispatch) => {
  try {
    dispatch({ type: RESETPASSWORD_REQUEST });

    const { data } = await resetedpassword(formData);

    dispatch({
      type: RESETPASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESETPASSWORD_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
export const subcription = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SUBSCRIPTION_REQUEST });

    const { data } = await subs(formData);

    dispatch({
      type: SUBSCRIPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
export const history = () => async (dispatch) => {
  try {
    dispatch({ type: HISTORY_REQUEST });

    const { data } = await his();

    dispatch({
      type: HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HISTORY_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
export const movee = () => async (dispatch) => {
  try {
    dispatch({ type: CODE_REQUEST });

    const { data } = await postc();

    dispatch({
      type: CODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CODE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
export const plan = () => async (dispatch) => {
  try {
    dispatch({ type: PLAN_REQUEST });

    const { data } = await plans();
    console.log(data);

    dispatch({
      type: PLAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLAN_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
