import { createSlice } from "@reduxjs/toolkit";

const initialUsersState = {
  isLoading: false,
  toast: false,
  message: "",
  toastType: "success",
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const rootsSlice = createSlice({
  name: "roots",
  initialState: initialUsersState,
  reducers: {
    setToast: (state, action) => {
      state.toast = action.payload.toast;
      state.message = action.payload.message;
      state.toastType = action.payload.toastType;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});
