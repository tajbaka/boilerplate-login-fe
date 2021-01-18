import { DASHBOARD_DATA, DASHBOARD_LOADING, DASHBOARD_ERROR } from "../actions";

const INITIAL_STATE = {
  users: [],
  error: "",
  next: false,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DASHBOARD_ERROR:
      return { ...state, error: action.payload };
    case DASHBOARD_LOADING:
      return { ...state, loading: action.payload };
    case DASHBOARD_DATA:
      const data = action.payload;
      const { emails, next } = data;
      const users = state.users.concat(emails);
      return { ...state, users, next };
    default:
      return state;
  }
};
