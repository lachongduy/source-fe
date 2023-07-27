import { createSlice } from "@reduxjs/toolkit";

const initialBannerState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  size: null,
  totalElements: null,
  totalPages: null,
  bannerData: null,
  bannerForEdit: undefined,
  banner: undefined,
  bannerId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const bannerSlice = createSlice({
  name: "Banner",
  initialState: initialBannerState,
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
    bannerList: (state, action) => {
      const { data, meta } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
      state.totalElements = meta.totalElements;
      state.totalPages = meta.totalPages;
    },
    bannerCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.banner = action.payload;
    },
    bannerDeleted: (state, action) => {
      state.error = null;
      state.bannerId = action.payload.id;
      state.actionsLoading = false;
    },
    bannerUpdate: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.bannerForEdit = action.payload;
    },
  },
});
