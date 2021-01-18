import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";
import RequireAuth from "../../components/RequireAuth/RequireAuth";

interface ISignOut {
  onSignOut: () => void;
}

class SignOut extends Component<ISignOut> {
  componentDidMount() {
    this.props.onSignOut();
  }

  public render() {
    return null;
  }
}

export default compose(
  connect(
    null,
    actions
  ),
  RequireAuth
)(SignOut);
