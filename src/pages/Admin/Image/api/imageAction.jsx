import * as requestFromServer from "./imageCrud";
import { callTypes, imageSlice } from "./imageSlice";

const { actions } = imageSlice;
export const fetchImages = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllImage(queryParams)
    .then((response) => {
      const { data, meta } = response.data;
      dispatch(
        actions.imageList({
          data, meta
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchImage = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllImage(queryParams)
    .then((response) => {
      const { data, meta } = response.data;
      dispatch(
        actions.imageList({
          data, meta
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchImageCustomer = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllImageCustomer(queryParams)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.imageListCustomer({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const createImage = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createImage(values)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.imageCreate(data));

    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteImage = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteImage(id)
    .then((response) => {
      dispatch(actions.imageDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateImage = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateImage(values)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.imageUpdate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

