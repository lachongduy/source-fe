import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../auth/_redux/authRedux";
import { rootsSlice } from "../pages/Root/_redux/rootSlice";
import { categorySlice } from "../pages/Admin/DanhMuc/api/danhMucSlice";
import { colorSlice } from "../pages/Admin/Color/api/colorSlice";
import { sizeSlice } from "../pages/Admin/Sizes/api/sizeSlice";
import { typeProductSlice } from "../pages/Admin/TypeProduct/api/typeSlice";
import { bannerSlice } from "../pages/Admin/Banner/api/bannerSlice";
import { newSlice } from "../pages/Admin/News/api/newSlice";
import { imageSlice } from "../pages/Admin/Image/api/imageSlice";
import { productSlice } from "../pages/Admin/Product/api/productSlice";
import { userSlice } from "../pages/Admin/User/api/userSlice";
import { cartSlice } from "../pages/Customer/cart/_redux/cartSlice";
import { tinhSlice } from "../pages/Tinh/_redux/tinhSlice";
import { orderSlice } from "../pages/Admin/Order/api/orderSlice";
import { dashboardSlice } from "../pages/Admin/Dashboard/api/dashboardSlice";
export const rootReducer = combineReducers({
  auth: auth.reducer,
  roots: rootsSlice.reducer,
  categorys: categorySlice.reducer,
  colors: colorSlice.reducer,
  sizes: sizeSlice.reducer,
  typeProducts: typeProductSlice.reducer,
  banners: bannerSlice.reducer,
  new: newSlice.reducer,
  image: imageSlice.reducer,
  product: productSlice.reducer,
  user: userSlice.reducer,
  cart: cartSlice.reducer,
  tinh: tinhSlice.reducer,
  order: orderSlice.reducer,
  dashboard: dashboardSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
