import { createSlice } from "@reduxjs/toolkit";

const initialCategoryState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  size: null,
  totalElements: null,
  totalPages: null,
  productData: null,
  danhmucForEdit: undefined,
  danhmuc: undefined,
  danhmucId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const categorySlice = createSlice({
  name: "categorys",
  initialState: initialCategoryState,
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
    categoryList: (state, action) => {
      const { data, meta } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
      state.totalElements = meta.totalElements;
      state.totalPages = meta.totalPages;
    },
    categoryListCustomer: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    categoryCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.danhmuc = action.payload;
    },
    categoryDeleted: (state, action) => {
      state.error = null;
      state.danhmucId = action.payload.id;
      state.actionsLoading = false;
    },
    categoryUpdate: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.danhmucForEdit = action.payload;
    },
  },
});
