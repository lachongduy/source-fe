import * as requestFromServer from "./typeCrud";

import { callTypes, typeProductSlice } from "./typeSlice";

const { actions } = typeProductSlice;

export const fetchTypeProducts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllTypeProduct(queryParams)
    .then((response) => {
      const { data, meta } = response.data;

      dispatch(
        actions.typeProductList({
          data, meta
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchTypeCustomer = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllTypeProductCustomer(queryParams)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.typeProductListCustomer({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const createTypeProduct = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createTypeProduct(values)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.typeProducCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteTypeProduct = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTypeProduct(id)
    .then((response) => {
      dispatch(actions.typeProducDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateTypeProduct = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateTypeProduct(values)
    .then((response) => {
      const { data } = response.data;
      console.log(data);
      dispatch(actions.typeProducUpdate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
