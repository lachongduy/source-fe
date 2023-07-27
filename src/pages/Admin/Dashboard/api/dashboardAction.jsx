import * as requestFromServer from "./dashboardCrud";

import { callTypes, dashboardSlice } from "./dashboardSlice";

const { actions } = dashboardSlice;

export const getDashboardThongKe = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getDashboardThongKe()
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.getDashboardThongKe({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't get list points";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const getDashboardChart = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getDashboardChart(queryParams)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.getDashboardChart({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't get list points";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const getDashboardTable = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getDashboardTable(queryParams)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.getDashboardTable({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't get list points";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};