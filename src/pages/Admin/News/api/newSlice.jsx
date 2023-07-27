import { createSlice } from "@reduxjs/toolkit";

const initialNewState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  size: null,
  totalElements: null,
  totalPages: null,
  newData: null,
  newForEdit: undefined,
  news: undefined,
  dataDetail: undefined,
  newId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const newSlice = createSlice({
  name: "New",
  initialState: initialNewState,
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
    newtList: (state, action) => {
      const { data, meta } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
      state.totalElements = meta.totalElements;
      state.totalPages = meta.totalPages;
    },
    newById: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.dataDetail = data;
    },
    newCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.news = action.payload;
    },
    newDeleted: (state, action) => {
      state.error = null;
      state.newId = action.payload.id;
      state.actionsLoading = false;
    },
    newUpdate: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.newForEdit = action.payload;
    },
  },
});
