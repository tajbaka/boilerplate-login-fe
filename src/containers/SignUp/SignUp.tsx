import React, { Component } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { bindFunctions } from "../../common";
import { SignForm } from "../../components";
import styles from "./SignUp.module.scss";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import * as actions from "../../actions/";
import user from "./user.png";

interface ISignUpProps extends InjectedFormProps, RouteComponentProps {
  auth: string;
  signUpError: string;
  loading: boolean;
  onSignUp: (formProps: any) => void;
}

class SignUp extends Component<ISignUpProps> {
  constructor(props: ISignUpProps) {
    super(props);
    bindFunctions(this, ["onSubmit"]);
  }

  public render() {
    const { auth, handleSubmit, signUpError, loading } = this.props;

    return (
      <div className={styles.wrapper}>
        {auth && <Redirect to="/dashboard" />}
        <SignForm
          linkText="Sign In"
          buttonText="Sign Up"
          bottomText={`Already have an account?`}
          bottomLink="/signin"
          errorText={signUpError}
          loading={loading}
          onLoginClick={handleSubmit(e => this.onSubmit({ e, type: "normal" }))}
          onSubmitGoogle={handleSubmit(() => this.onSubmit({ type: "google" }))}
          onSubmitFacebook={handleSubmit(() =>
            this.onSubmit({ type: "facebook" })
          )}
        />
      </div>
    );
  }

  private onSubmit = formProps => {
    const { type, ...props } = formProps;

    const callback = () => {
      this.props.history.push("/dashboard");
    };

    switch (type) {
      case "normal":
        this.props.onSignUp({ ...formProps, callback });
        break;
      case "google":
        window.location.href = "http://localhost:3090/auth/google";
        break;
      case "facebook":
        window.location.href = "http://localhost:3090/auth/facebook";
        break;
      default:
        break;
    }
  };
}

const mapStateToProps = state => {
  const { auth } = state;
  const { signUpError, loading } = auth;
  return {
    auth: auth.auth,
    signUpError,
    loading
  };
};

export default compose(
  reduxForm({ form: "signup" }),
  connect(
    mapStateToProps,
    actions
  )
)(SignUp);
