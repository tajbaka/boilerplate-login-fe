import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Field } from "redux-form";

import google from "./search.png";
import facebook from "./facebook.png";
import user from "./user.png";

import styles from "./SignForm.module.scss";

interface ISignFormProps {
  loading: boolean;
  errorText: string;
  buttonText: string;
  bottomText: string;
  bottomLink: string;
  linkText: string;
  onLoginClick: (formProps: any) => void;
  onSubmitGoogle: () => void;
  onSubmitFacebook: () => void;
}

export const SignForm: React.SFC<ISignFormProps> = props => {
  const {
    loading,
    onLoginClick,
    onSubmitGoogle,
    onSubmitFacebook,
    errorText,
    bottomText,
    linkText,
    bottomLink,
    buttonText
  } = props;

  return (
    <form className={classNames(styles.form, loading && styles.loading)}>
      <fieldset className={styles.fieldset}>
        <label> Email </label>
        <Field name="email" type="text" component="input" />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <label> Password </label>
        <Field name="password" type="password" component="input" />
        <button onClick={onLoginClick} className={styles.loginButton}>
          <div
            style={{
              backgroundImage: `url(${user})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "30px",
              width: "30px"
            }}
          />
          <span> {buttonText}</span>
        </button>
        <h5 className={styles.error}>{errorText}</h5>
        <button onClick={onSubmitGoogle} className={styles.google}>
          <div
            style={{
              backgroundImage: `url(${google})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "30px",
              width: "30px"
            }}
          />
          <span> Log in with Google </span>
        </button>
        <button onClick={onSubmitFacebook} className={styles.facebook}>
          <div
            style={{
              backgroundImage: `url(${facebook})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "30px",
              width: "30px"
            }}
          />
          <span> Log in with Facebook </span>
        </button>
        <h4 className={styles.noAccount}>
          {bottomText + " "}
          <Link to={bottomLink} {...({} as any)}>
            {linkText}
          </Link>
        </h4>
      </fieldset>
    </form>
  );
};

export default SignForm;
