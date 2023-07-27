import React from "react";

import { Link } from "react-router-dom";
// const listOne = [
//   {
//     id: 1,
//     name: "Chính sách bảo hành",
//   },
//   { id: 2, name: "Chính sách đổi trả" },
// ];

const listTwo = [
  {
    id: 1,
    name: "Quy chế hoạt động website",
  },
  { id: 2, name: "Giới thiệu về cửa hàng" },
  { id: 3, name: "Gửi góp ý, khiếu nại" },
  { id: 4, name: "Tuyển dụng" },
];
const listThree = [
  { id: 1, name: "Gọi mua : 0907 785 214" },
  { id: 2, name: "Tư vấn bán hàng : 0907 785 214" },
  { id: 3, name: "CSKH  : 0907 785 214" },
];
const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="max-w-[1200px] w-full mx-auto py-5 pb-0 " >
        <div className="flex gap-x-5 justify-between">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.881650931807!2d106.67341417495702!3d10.743603689403178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e52d53089e7%3A0xab563a75b2f0ced6!2zMzIgxJAuIENhbyBM4buXLCBQaMaw4budbmcgNCwgUXXhuq1uIDgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1686322498758!5m2!1svi!2s"
            width="400" height="250" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <div className="">
            <ul>
              <li>THÔNG TIN</li>
              <li className="p-2">

                <Link className="text-white" to={"/"} >  Trang chủ</Link>
              </li>
              <li className="p-2">
                <Link className="text-white" to={"/"}>Giới thiệu</Link>
              </li>
              <li className="p-2">
                <Link className="text-white" to={"/"}>Sản phẩm</Link>
              </li>
              <li className="p-2">
                <Link className="text-white" to={"/"}>Tin tức</Link>
              </li>

            </ul>
          </div>
          <div className="h-[280px]">
            <ul>
              {listTwo?.map((item) => (
                <li className="p-2" key={item.id}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <ul>
              <li className="p-2 font-semibold">Tổng đài hỗ trợ</li>
              {listThree?.map((item) => (
                <li className="p-2" key={item.id}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />
        <div className="py-2 text-center font-semibold">© 2023 HD-STORE</div>

      </div>
    </div>
  );
};

export default Footer;
