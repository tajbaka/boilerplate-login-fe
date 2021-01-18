import { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { RouteComponentProps } from "react-router-dom";
import * as actions from "../../actions";

interface ISocialLoginRedirectProps extends RouteComponentProps {
  onSuccessSocialLogin(socialSignInProps: any): void;
}

class SocialLoginRedirect extends Component<ISocialLoginRedirectProps> {
  public componentDidMount() {
    const callback = () => {
      this.props.history.push("/dashboard");
    };
    this.props.onSuccessSocialLogin({ callback });
  }

  public render() {
    return null;
  }
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
  connect(
    mapStateToProps,
    actions
  )
)(SocialLoginRedirect);
