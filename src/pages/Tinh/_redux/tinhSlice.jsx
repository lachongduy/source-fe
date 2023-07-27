import { createSlice } from "@reduxjs/toolkit";

const initialTinhState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  tinh: undefined,
  tinhId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const tinhSlice = createSlice({
  name: "tinh",
  initialState: initialTinhState,
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
    // findpoints
    tinhList: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
  },
});
