import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { bindFunctions } from "../../common";

interface IComposedComponentProps extends RouteComponentProps {
  auth: string;
}

export default <P extends object>(ChildComponent: React.ComponentType<any>) => {
  class ComposedComponent extends Component<IComposedComponentProps> {
    constructor(props: IComposedComponentProps) {
      super(props);
      bindFunctions(this, ["shouldNavigateAway"]);
    }

    public componentDidMount() {
      this.shouldNavigateAway();
    }

    public componentDidUpdate() {
      this.shouldNavigateAway();
    }

    public render() {
      return <ChildComponent {...this.props} />;
    }

    private shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.replace("/signin");
      }
    }
  }

  const mapStateToProps = state => {
    const { auth } = state;
    return {
      auth: auth.auth
    };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
