import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import auth from "./auth";
import dashboard from "./dashboard";

export default combineReducers({
  auth,
  dashboard,
  form
});
