import React, { Component } from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { bindFunctions } from "../../common";
import { SignForm } from "../../components";
import styles from "./SignIn.module.scss";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions/";

interface ISignInProps extends InjectedFormProps, RouteComponentProps {
  auth: string;
  signInError: string;
  loading: boolean;
  onSignIn: (formProps: any) => void;
}

class SignIn extends Component<ISignInProps> {
  constructor(props: ISignInProps) {
    super(props);
    bindFunctions(this, ["onSubmit"]);
  }

  public render() {
    const { handleSubmit, signInError, loading, auth } = this.props;

    return (
      <div className={styles.wrapper}>
        {auth && <Redirect to="/dashboard" />}
        <SignForm
          linkText="Sign Up"
          buttonText="Sign In"
          bottomText={`Don't have an account?`}
          bottomLink="/signup"
          errorText={signInError}
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
        this.props.onSignIn({ ...props, callback });
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
  const { signInError, loading } = auth;
  return {
    auth: auth.auth,
    signInError,
    loading
  };
};

export default compose(
  reduxForm({ form: "signin" }),
  connect(
    mapStateToProps,
    actions
  )
)(SignIn);
