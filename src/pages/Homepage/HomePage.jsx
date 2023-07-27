import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import BreadcrumbsNav from "../../components/nav-crumbs/Breadcrumbs ";
import LayoutCustomer from "../../layouts/LayoutCustomer";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import { useSearchContext } from "../../context/SearchContext";
import * as productAction from "../Admin/Product/api/productAction";
import BaiViet from "../Customer/Bai-viet/BaiViet";
import ProductList from "../Product/ProductList";
import HomeBanner from "./HomeBanner";
const HomePage = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.product }),
    shallowEqual
  );
  const { productDataDanhMuc: productData } = currentState;
  const { state } = useSearchContext()
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAction.fetchProductCustomer({ params: { ...state } }));
    handleScroll();
  }, [dispatch, state]);

  const handleScroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (

    <LayoutCustomer>

      <Box>
        <Box><HomeBanner /></Box>
      </Box>
      <Box className="max-w-[1200px] w-full mx-auto">
        <Box sx={{ paddingY: "20px" }}>
          <BreadcrumbsNav title="Trang chủ" subtitle="Tất cả" childTitle="" />
        </Box>
        <Box sx={{ paddingY: "20px" }}>

          {productData?.length > 0 ? (<ProductList scrollRef={scrollRef} data={productData ? productData : null} />) : (<div className="flex flex-col items-center my-10">
            <h1 className="text-2xl font-bold mb-16">Không tìm thấy sản phẩm</h1>

            <div className="relative w-64">
              <img
                src="/img/notseach.png"
                alt="SuccessImage"
                className="w-full h-auto animate-bounce"
              />
            </div>

          </div>)}
        </Box>
        <Box><BaiViet /> </Box>
      </Box>
    </LayoutCustomer>
  )

};

export default HomePage;
