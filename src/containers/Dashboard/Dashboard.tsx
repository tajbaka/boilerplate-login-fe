import React, { Component } from "react";
import RequireAuth from "../../components/RequireAuth/RequireAuth";
import { connect } from "react-redux";
import { compose } from "redux";
import styles from "./Dashboard.module.scss";
import * as actions from "../../actions";

interface IDashboard {
  auth: string;
  users: Array<string>;
  onGetUsers(): void;
}

interface IDashboardState {
  test?: string;
}

class Dashboard extends Component<IDashboard, IDashboardState> {
  constructor(props: IDashboard) {
    super(props);
    this.onScroll = this.onScroll.bind(this);

    this.state = {
      test: "hey"
    };
  }

  public componentWillMount() {
    this.props.onGetUsers();
  }

  public render() {
    const { users } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.listWrapper} onScroll={this.onScroll}>
          {users.map((user: any) => (
            <span>{user}</span>
          ))}
        </div>
      </div>
    );
  }

  private onScroll(e: any) {
    const bottom =
      Math.ceil(e.target.scrollHeight - e.target.scrollTop) ===
      Math.ceil(e.target.clientHeight);

    console.log(
      Math.ceil(e.target.scrollHeight - e.target.scrollTop),
      Math.ceil(e.target.clientHeight)
    );

    if (bottom) {
      console.log("here");
      this.props.onGetUsers();
    }
  }
}

const mapStateToProps = state => {
  const { auth, dashboard } = state;
  const { signInError, loading } = auth;
  const { users } = dashboard;
  return {
    auth: auth.auth,
    signInError,
    loading,
    users
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(RequireAuth(Dashboard));
