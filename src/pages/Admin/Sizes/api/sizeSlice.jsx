import { createSlice } from "@reduxjs/toolkit";

const initialSizeState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  //size: null,
  totalElements: null,
  totalPages: null,
  productData: null,
  sizeForEdit: undefined,
  size: undefined,
  sizeId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const sizeSlice = createSlice({
  name: "sizes",
  initialState: initialSizeState,
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
    sizeList: (state, action) => {
      const { data, meta } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
      state.totalElements = meta.totalElements;
      state.totalPages = meta.totalPages;
    },
    oneSizeList: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.productData = action.payload;
    },
    sizeListCustomer: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    sizeCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.size = action.payload;
    },
    sizeDeleted: (state, action) => {
      state.error = null;
      state.sizeId = action.payload.id;
      state.actionsLoading = false;
    },
    sizeUpdate: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.sizeForEdit = action.payload;
    },
  },
});
