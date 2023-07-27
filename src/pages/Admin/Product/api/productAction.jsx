import * as requestFromServer from "./productCrud";

import { callTypes, productSlice } from "./productSlice";

const { actions } = productSlice;

export const fetchProducts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllProduct(queryParams)
    .then((response) => {
      const { data, meta } = response.data;

      dispatch(
        actions.producttList({
          data, meta
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchProductCustomer = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllProductCustomer(queryParams)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.producttListCutomer({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchProductById = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getByIdProduct(id)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.productByIttList({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const createProduct = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createProduct(values)
    .then((response) => {
      console.log(response);
      const { data } = response.data;
      dispatch(actions.productCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const updateProduct = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .updateProduct(values)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.productUpdate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const deleteProduct = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProduct(id)
    .then((response) => {
      dispatch(actions.producDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

