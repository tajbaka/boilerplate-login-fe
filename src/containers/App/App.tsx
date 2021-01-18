import React from "react";
import Header from "../../components/Header/Header";
import "./App.scss";

class App extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <Header />
        {children}
      </React.Fragment>
    );
  }
}

export default App;
