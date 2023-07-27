import * as requestFromServer from "./colorCrud";

import { callTypes, colorSlice } from "./colorSlice";

const { actions } = colorSlice;

export const fetchColors = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllColor(queryParams)
    .then((response) => {
      const { data, meta } = response.data;
      dispatch(
        actions.colorList({
          data,
          meta,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchColorCustomer = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllColors(queryParams)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.colorListCustomer({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const createColor = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createColor(values)
    .then((response) => {
      const { data } = response;
      dispatch(actions.colorCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteColor = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteColor(id)
    .then((response) => {
      dispatch(actions.colorDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateColor = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateColor(values)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.colorUpdate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
