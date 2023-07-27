import * as requestFromServer from "./newCrud";

import { callTypes, newSlice } from "./newSlice";

const { actions } = newSlice;

export const fetchNews = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllNew(queryParams)
    .then((response) => {
      const { data, meta } = response.data;

      dispatch(
        actions.newtList({
          data, meta
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const createNew = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createNew(values)
    .then((response) => {
      console.log(response);
      const { data } = response.data;
      dispatch(actions.newCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchNewById = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getByIdNew(id)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.newById({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const updateNew = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .updateNew(values)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.newUpdate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const deleteNew = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteNew(id)
    .then((response) => {
      dispatch(actions.newDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

