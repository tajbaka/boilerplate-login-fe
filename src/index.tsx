import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import App from "./containers/App/App";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import SignOut from "./containers/SignOut/SignOut";
import Dashboard from "./containers/Dashboard/Dashboard";
import SocialLoginRedirect from "./containers/SocialLoginRedirect/SocialLoginRedirect";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";

import "./index.scss";

const store = createStore(
  reducers,
  {
    auth: {
      auth: localStorage.getItem("auth"),
      loading: false,
      signInError: "",
      signUpError: ""
    }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App>
          <Switch>
            <Redirect exact path="/" to="/signin" />
            <Route path="/signin" exact component={SignIn as any} />
            <Route path="/signup" exact component={SignUp as any} />
            <Route path="/signout" exact component={SignOut as any} />
            <Route path="/dashboard" exact component={Dashboard as any} />
            <Route
              path="/login/success"
              exact
              component={SocialLoginRedirect as any}
            />
          </Switch>
        </App>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
