import { createSlice } from "@reduxjs/toolkit";

const initialOrdertState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  size: null,
  totalElements: null,
  totalPages: null,
  orderData: null,
  orderDataHistory: null,
  orderForEdit: undefined,
  orderForAdminEdit: undefined,
  order: undefined,
  orderId: undefined,
  lastError: null,
  orderSuccess: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const orderSlice = createSlice({
  name: "Order",
  initialState: initialOrdertState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
        state.data = null;
      } else {
        state.actionsLoading = true;
      }
    },
    orderList: (state, action) => {
      const { data, meta } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
      state.totalElements = meta.totalElements;
      state.totalPages = meta.totalPages;
    },
    orderCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.order = action.payload;
    },
    orderHistoryById: (state, action) => {
      const { data, meta } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.orderDataHistory = data;
      state.totalElements = meta.totalElements;
      state.totalPages = meta.totalPages;
    },
    orderDeleted: (state, action) => {
      state.error = null;
      state.orderId = action.payload.id;
      state.actionsLoading = false;
    },
    orderUpdateStatusSuccess: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.orderForEdit = action.payload;
    },
    orderUpdateStatusCancelOfAdmin: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.orderForAdminEdit = action.payload;
    },
    orderSuccess: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.orderSuccess = action.payload;
    },
  },
});
