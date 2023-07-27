import * as requestFromServer from "./danhMucCrud";

import { callTypes, categorySlice } from "./danhMucSlice";

const { actions } = categorySlice;

export const fetchCategories = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCatetory(queryParams)
    .then((response) => {
      const { data, meta } = response.data;
      dispatch(
        actions.categoryList({
          data, meta
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCategoryCustomer = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCatetoriesCustomer(queryParams)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.categoryListCustomer({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const createCategory = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createCatetory(values)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.categoryCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteCategory = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCatetory(id)
    .then((response) => {
      dispatch(actions.categoryDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateCatetory = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCatetory(values)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.categoryUpdate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
