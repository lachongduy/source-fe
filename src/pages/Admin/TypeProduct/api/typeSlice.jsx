import { createSlice } from "@reduxjs/toolkit";

const initialtypeProductState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  size: null,
  totalElements: null,
  totalPages: null,
  productData: null,
  typeProductForEdit: undefined,
  typeProduct: undefined,
  typeProductId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const typeProductSlice = createSlice({
  name: "typeProducts",
  initialState: initialtypeProductState,
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
    typeProductList: (state, action) => {
      const { data, meta } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
      state.totalElements = meta.totalElements;
      state.totalPages = meta.totalPages;
    },
    typeProductListCustomer: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    oneTypeProducList: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.productData = action.payload;
    },
    typeProducCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.typeProduct = action.payload;
    },
    typeProducDeleted: (state, action) => {
      state.error = null;
      state.typeProductId = action.payload.id;
      state.actionsLoading = false;
    },
    typeProducUpdate: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.typeProductForEdit = action.payload;
    },
  },
});
