import { rootsSlice } from "./rootSlice";

const { actions } = rootsSlice;

export const setToast = (queryParams) => (dispatch) => {
  const { toast, message, toastType } = queryParams;
  dispatch(actions.setToast({ toast, message, toastType }));
};

export const setLoading = (queryParams) => (dispatch) => {
  const { isLoading } = queryParams;
  dispatch(actions.setLoading({ isLoading }));
};
