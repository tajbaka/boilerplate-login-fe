import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_SIGNIN_ERROR,
  AUTH_SIGNUP_ERROR
} from "../actions";

const INITIAL_STATE = {
  auth: "",
  signInError: "",
  signUpError: "",
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, loading: action.payload };
    case AUTH_SUCCESS:
      return { ...INITIAL_STATE, auth: action.payload };
    case AUTH_SIGNUP_ERROR:
      return { ...state, signUpError: action.payload };
    case AUTH_SIGNIN_ERROR:
      return { ...state, signInError: action.payload };
    default:
      return state;
  }
};
