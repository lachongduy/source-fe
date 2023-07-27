import { toast } from "react-toastify";
import * as rootAction from "./../pages/Root/_redux/rootAction";
// const dispatch = useDispatch();
export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { authToken },
      } = store.getState();
      store.dispatch(rootAction.setLoading({ isLoading: true }));
      if (authToken?.token) {
        config.headers.Authorization = `Bearer ${authToken?.token}`;
      }
      return config;
    },
    (err) => {
      Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      // if (response?.data?.status.code === 201) {
      //   setTimeout(() => {
      //     store.dispatch(rootAction.setLoading({ isLoading: false }));
      //     toast.warning(response?.data?.status.message);
      //   }, 500);
      // } else {
      //   setTimeout(() => {
      //     store.dispatch(rootAction.setLoading({ isLoading: false }));
      //     toast.success(response?.data?.status.message);
      //   }, 500);
      // }
      setTimeout(() => {
        if (response?.data?.status?.code === 201) {
          store.dispatch(rootAction.setLoading({ isLoading: false }));
          toast.warning(response?.data?.status.message);
        } else {
          store.dispatch(rootAction.setLoading({ isLoading: false }));
          toast.success(response?.data?.status.message);
        }
      }, 500);
      return response;
    },
    (error) => {
      store.dispatch(rootAction.setLoading({ isLoading: false }));
      toast.error(error.response.data.message);
      return error;
    }
  );
}
