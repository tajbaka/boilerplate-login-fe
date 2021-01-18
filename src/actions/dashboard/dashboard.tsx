import { getUsers } from "./dashboard-api";

export const onGetUsers = () => (dispatch, getState) => {
  const state = getState();
  const { auth, dashboard } = state;
  const { next } = dashboard;
  getUsers({ auth, dispatch, next });
};
