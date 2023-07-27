import { createSlice } from "@reduxjs/toolkit";

const initialDashboard = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  dataThongKe: null,
  chart: null,
  dashboard: null,
  table: null,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboard,
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
    getDashboardThongKe: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.dataThongKe = data;
    },
    getDashboardChart: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.chart = data;
    },
    getDashboardTable: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.table = data;
    },
  },
});
