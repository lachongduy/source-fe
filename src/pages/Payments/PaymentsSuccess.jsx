import React from "react";
import LayoutCustomer from "../../layouts/LayoutCustomer";
import { Link } from "react-router-dom";

const PaymentsSuccess = () => {
  return (
    <LayoutCustomer>
      <div className="flex flex-col items-center my-10">
        <h1 className="text-2xl font-bold mb-16">Thanh toán thành công!</h1>

        <div className="relative w-64">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2568/2568241.png"
            alt="SuccessImage"
            className="w-full h-auto animate-bounce"
          />
        </div>
        <p className="text-lg text-gray-600 mb-10">Cảm ơn bạn đã đặt hàng.</p>
        <div className="flex space-x-4 mt-6">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Tiếp tục mua hàng
          </Link>
          <Link
            to="/user/order/history"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
            Xem lịch sử đặt hàng
          </Link>
        </div>
      </div>
    </LayoutCustomer>
  );
};

export default PaymentsSuccess;
