import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { connect } from "react-redux";
import * as actions from "../../actions";

interface IHeaderProps {
  auth: string;
}

export const Header: React.SFC<IHeaderProps> = props => {
  const { auth } = props;

  if (!auth) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {test}
      <Link to="/dashboard" {...({} as any)}>
        Dashboard
      </Link>
      <Link to="/signout" {...({} as any)}>
        Sign Out
      </Link>
    </div>
  );
};

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
