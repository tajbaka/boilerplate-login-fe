import { signIn, signUp, signOut, successSocialLogin } from "./auth-api";

export const onSignIn = signInProps => (dispatch, state) => {
  signIn({ ...signInProps, dispatch });
};

export const onSignUp = signInProps => (dispatch, state) => {
  signUp({ ...signInProps, dispatch });
};

export const onSignOut = () => dispatch => {
  signOut({ dispatch });
};

export const onSuccessSocialLogin = socialSignInProps => dispatch => {
  successSocialLogin({ ...socialSignInProps, dispatch });
};
