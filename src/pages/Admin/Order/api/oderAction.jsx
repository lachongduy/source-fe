import * as requestFromServer from "./orderCrud";

import { callTypes, orderSlice } from "./orderSlice";

const { actions } = orderSlice;

export const fetchOrders = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllOrder(queryParams)
    .then((response) => {
      const { data, meta } = response.data;

      dispatch(
        actions.orderList({
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
export const createOrder = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createOrder(values)
    .then((response) => {
      const { data, status } = response.data;
      if (status.code === 200) {
        dispatch(actions.orderSuccess(data._id));
        dispatch(actions.orderCreate(data));
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchOrderHistory = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllOrderByUserId(queryParams)
    .then((response) => {
      const { data, meta } = response.data;

      dispatch(
        actions.orderHistoryById({
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
//2
export const deleteOrder = (id, values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOrder(id, values)
    .then((response) => {
      dispatch(actions.orderDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
//1
export const updateOrder = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .updateStatusSuccess(values)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.orderUpdateStatusSuccess(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
//3
export const updateOrderCancelOfAdmin = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .updateStatusCancelOfAdmin(values)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.orderUpdateStatusCancelOfAdmin(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const exportExcel = (queryParams) => (dispatch) => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .exportExcel(queryParams)
    .then((response) => {
      const filename = `${formattedDate}_du_lieu_don_hang.xlsx`;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
