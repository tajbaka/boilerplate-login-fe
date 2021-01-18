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
    bindFunctions(this, ["onSubmit", "onSubmitGoogle", "onSubmitFacebook"]);
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
          onLoginClick={handleSubmit(this.onSubmit)}
          onSubmitGoogle={handleSubmit(this.onSubmitGoogle)}
          onSubmitFacebook={handleSubmit(this.onSubmitFacebook)}
        />
      </div>
    );
  }

  private onSubmit = formProps => {
    const callback = () => {
      this.props.history.push("/dashboard");
    };
    this.props.onSignIn({ ...formProps, callback });
  };

  private onSubmitGoogle = () => {
    window.location.href = "http://localhost:3090/auth/google";
  };

  private onSubmitFacebook = () => {
    const callback = () => {
      this.props.history.push("/dashboard");
    };
    const type = "facebook";
    this.props.onSignIn({ type, callback });
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
