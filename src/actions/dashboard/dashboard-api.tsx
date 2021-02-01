import { axiosInstance } from "../../common";
import { DASHBOARD_DATA, DASHBOARD_LOADING, DASHBOARD_ERROR } from ".";

export const getUsers = ({ dispatch, auth, next }) => {
  let config = {
    headers: { auth },
    params: { next }
  };

  dispatch({
    type: DASHBOARD_LOADING,
    payload: true
  });

  axiosInstance
    .get("/get-users", config)
    .then(res => {
      dispatch({
        type: DASHBOARD_DATA,
        payload: res.data
      });
      dispatch({
        type: DASHBOARD_LOADING,
        payload: false
      });
    })
    .catch(err => {
      dispatch({
        type: DASHBOARD_ERROR,
        payload: err
      });
    });
};
