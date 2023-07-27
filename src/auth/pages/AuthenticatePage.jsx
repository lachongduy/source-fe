
import React from "react";
import { useLocation } from "react-router-dom";
const AuthenticatePage = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div className="overflow-y-scroll overflow-scrollbar flex items-center ">
      <div className="basis-[65%] h-[100vh]"><img src="/img/bg-login.jpg" alt="" className="w-full h-full object-fill" /></div>
      <div className="flex-1 w-[450px] p-8 rounded-xl my-auto">
        <h1 className="text-center font-bold text-4xl mb-8 text-slate-500">
          {pathname === "/sign-up"
            ? "Đăng ký"
            : pathname === "/forgot-password"
              ? "Quên mật khẩu"
              : pathname === "/reset-password"
                ? "Tạo lại mật khẩu"
                : "Đăng nhập"}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthenticatePage;
