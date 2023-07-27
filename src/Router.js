import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPasswordPage from "./auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./auth/pages/ResetPasswordPage";
import SignInPage from "./auth/pages/SignInPage";
import SignUpPage from "./auth/pages/SignUpPage";
import AdminPage from "./pages/Admin/AdminPage";
import BannerListPage from "./pages/Admin/Banner/BannerListPage";
import ColorListPage from "./pages/Admin/Color/ColorListPage";
import DanhMucListPage from "./pages/Admin/DanhMuc/DanhMucListPage";
import ImageListPage from "./pages/Admin/Image/ImageListPage";
import NewListPage from "./pages/Admin/News/NewListPage";
import OrderListPage from "./pages/Admin/Order/OrderListPage";
import ProductListPage from "./pages/Admin/Product/ProductListPage";
import SizeListPage from "./pages/Admin/Sizes/SizeListPage";
import TypeListPage from "./pages/Admin/TypeProduct/TypeListPage";
import UserListPage from "./pages/Admin/User/UserListPage";
import BaiVietDetail from "./pages/Customer/Bai-viet/BaiVietDetail";
import Content from "./pages/Customer/Content";
import OrderHistory from "./pages/Customer/History/OrderHistory";
import CartListPage from "./pages/Customer/cart/cartListPage";
import HomePage from "./pages/Homepage/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import PaymentsListPage from "./pages/Payments/PaymentsListPage";
import PaymentsSuccess from "./pages/Payments/PaymentsSuccess";
import ProductDetail from "./pages/Product/ProductDetail";
import PaymentsLogin from "./pages/Payments/PaymentsLogin";
import UpdateInfomations from "./pages/Customer/InfomationsUser/UpdateInfomations";

const Router = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.auth }),
    shallowEqual
  );
  const { authToken } = currentState;
  return (
    <>
      <Routes>
        {/* Auth */}
        <Route
          path="/sign-in"
          element={
            !currentState?.authToken?.token ? (
              <SignInPage />
            ) : (
              <Navigate to="/" />
            )
          }></Route>
        <Route
          path="/sign-up"
          element={
            !currentState?.authToken?.token ? (
              <SignUpPage />
            ) : (
              <Navigate to="/" />
            )
          }></Route>
        <Route
          path="/forgot-password"
          element={
            !currentState?.authToken?.token ? (
              <ForgotPasswordPage />
            ) : (
              <Navigate to="/" />
            )
          }></Route>
        <Route
          path="/reset-password"
          element={
            !currentState?.authToken?.token ? (
              <ResetPasswordPage />
            ) : (
              <Navigate to="/" />
            )
          }></Route>
        <Route path="/logout" element={<Navigate to="/" />}></Route>
        {/* Home */}
        <Route
          path="/"
          element={
            authToken?.user?.role === "Admin" ||
            authToken?.user?.role === "Personnel" ||
            authToken?.user?.role === "Manager" ? (
              <Navigate to="/admin" />
            ) : (
              <HomePage />
            )
          }></Route>
        {/* Admin */}
        <Route
          path="/admin"
          element={
            authToken?.user?.role === "Admin" ||
            authToken?.user?.role === "Personnel" ||
            authToken?.user?.role === "Manager" ? (
              <AdminPage />
            ) : (
              <Navigate to="/" />
            )
          }></Route>
        <Route path="/admin/category" element={<DanhMucListPage />}></Route>
        <Route path="/admin/color" element={<ColorListPage />}></Route>
        <Route path="/admin/size" element={<SizeListPage />}></Route>
        <Route path="/admin/typeProduct" element={<TypeListPage />}></Route>
        <Route path="/admin/banner" element={<BannerListPage />}></Route>
        <Route path="/admin/new" element={<NewListPage />}></Route>
        <Route path="/admin/image" element={<ImageListPage />}></Route>
        <Route path="/admin/product" element={<ProductListPage />}></Route>
        <Route path="/admin/user" element={<UserListPage />}></Route>
        <Route path="/admin/order" element={<OrderListPage />}></Route>

        {/*  */}
        {/* User */}
        <Route path="/" element={<HomePage />} />
        <Route path="/danhmuc/:slug" element={<Content />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartListPage />} />
        <Route path="/bai-viet/:slug" element={<BaiVietDetail />} />
        <Route path="/payments" element={<PaymentsListPage />} />
        <Route path="/payments/success" element={<PaymentsSuccess />} />
        <Route path="/payments/login" element={<PaymentsLogin />} />
        <Route path="/user/order/history" element={<OrderHistory />} />
        <Route path="/user/infomations/" element={<UpdateInfomations />} />
        {/*  */}

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
};

export default Router;
