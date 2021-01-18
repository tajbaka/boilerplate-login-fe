import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { connect } from "react-redux";
import * as actions from "../../actions";

interface IHeaderProps {
  auth: string;
}

export class Header extends Component<IHeaderProps, {}> {
  public render() {
    const { auth } = this.props;

    if (!auth) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        <Link to="/dashboard" {...({} as any)}>
          Dashboard
        </Link>
        <Link to="/signout" {...({} as any)}>
          Sign Out
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    auth: auth.auth
  };
};

export default connect(
  mapStateToProps,
  actions
)(Header);
