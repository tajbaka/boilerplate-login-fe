import { axiosInstance } from "../../common";
import { AUTH_SUCCESS, AUTH_SIGNIN_ERROR, AUTH_SIGNUP_ERROR } from "./";

export const signIn = async ({ type, email, password, dispatch, callback }) => {
  if (type === "google") {
    axiosInstance
      .get("/auth/google")
      .then(res => {
        const auth = res.data.token;
        dispatch({
          type: AUTH_SUCCESS,
          payload: auth
        });
        localStorage.setItem("auth", auth);
        callback();
      })
      .catch(err => {
        let { message, response } = err;
        if (response) {
          message = response.data;
        } else if (!message && !response) {
          message = "Something went wrong";
        }
        dispatch({
          type: AUTH_SIGNIN_ERROR,
          payload: message
        });
      });
  } else {
    axiosInstance
      .post("/signin", { email, password })
      .then(res => {
        const auth = res.data.token;
        localStorage.setItem("auth", auth);
        dispatch({
          type: AUTH_SUCCESS,
          payload: auth
        });
        callback();
      })
      .catch(err => {
        let { message, response } = err;
        if (response) {
          message = response.data;
        } else if (!message && !response) {
          message = "Something went wrong";
        }
        dispatch({
          type: AUTH_SIGNIN_ERROR,
          payload: message
        });
      });
  }
};

export const signUp = ({ email, password, callback, dispatch }) => {
  axiosInstance
    .post("/signup", { email, password })
    .then(res => {
      const auth = res.data.token;
      dispatch({
        type: AUTH_SUCCESS,
        payload: auth
      });
      localStorage.setItem("auth", auth);
      callback();
    })
    .catch(err => {
      let { message, response } = err;
      if (response) {
        message = response.data.error;
      } else if (!message && !response) {
        message = "Something went wrong";
      }
      dispatch({
        type: AUTH_SIGNUP_ERROR,
        payload: message
      });
    });
};

export const signOut = ({ dispatch }) => {
  dispatch({
    type: AUTH_SUCCESS,
    payload: ""
  });
  localStorage.removeItem("auth");
};

export const successSocialLogin = ({ dispatch, callback }) => {
  axiosInstance
    .get("/login/success", {
      withCredentials: true
    })
    .then(res => {
      const auth = res.data.token;
      dispatch({
        type: AUTH_SUCCESS,
        payload: auth
      });
      localStorage.setItem("auth", auth);
      callback();
    })
    .catch(err => {
      let { message, response } = err;
      if (response) {
        message = response.data;
      } else if (!message && !response) {
        message = "Something went wrong";
      }
      dispatch({
        type: AUTH_SIGNIN_ERROR,
        payload: message
      });
    });
};
