import React from "react";
import LayoutCustomer from "../../layouts/LayoutCustomer";
import { Link } from "react-router-dom";

const PaymentsLogin = () => {
    return (
        <LayoutCustomer>
            <div className="flex flex-col items-center my-10">
                <h1 className="text-2xl font-bold mb-16">Bạn chưa đăng nhập vào website.</h1>
                <div className="relative w-80">
                    <img
                        src="/img/login.jpg"
                        alt="loginImage"
                        className="w-full h-auto animate-bounce"
                    />
                </div>
                <p className="text-lg text-gray-600 mb-10">Bạn vui lòng đăng nhập.</p>
                <div className="flex space-x-4 mt-6">

                    <Link
                        to="/sign-in"
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                        Đi đến đăng nhập
                    </Link>
                </div>
            </div>
        </LayoutCustomer>
    );
};

export default PaymentsLogin;
