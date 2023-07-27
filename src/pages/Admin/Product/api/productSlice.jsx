import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  size: null,
  totalElements: null,
  totalPages: null,
  productData: null,
  productForEdit: undefined,
  product: undefined,
  productId: undefined,
  productDataDanhMuc: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const productSlice = createSlice({
  name: "Product",
  initialState: initialProductState,
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
    producttList: (state, action) => {
      const { data, meta } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
      state.totalElements = meta.totalElements;
      state.totalPages = meta.totalPages;
    },
    producttListCutomer: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.productDataDanhMuc = data;
    },
    productByIttList: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    productCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.product = action.payload;
    },
    producDeleted: (state, action) => {
      state.error = null;
      state.productId = action.payload.id;
      state.actionsLoading = false;
    },
    productUpdate: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.productForEdit = action.payload;
    },
  },
});
