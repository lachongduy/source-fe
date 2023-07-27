import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Footer from "../components/footer/Footer";
import HeaderCustomer from "../components/header/HeaderCustomer";
import Navbar from "./Navbar";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../pages/Admin/DanhMuc/api/danhMucAction";
import { isNull } from "lodash";
import CartDrawer from "../pages/Customer/cart/CartDrawer";
const LayoutCustomer = ({ children, isNotFooter }) => {
  const [newCate, setNewCate] = React.useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchCategoryCustomer()
    );
  }, [dispatch]);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.categorys }),
    shallowEqual
  );
  const { data } = currentState;

  useEffect(() => {
    if (!isNull(data)) {
      const tamp = data.filter(item => item.status === true)
      setNewCate(tamp);
    }
  }, [data])


  return (
    <>
      <Box className="flex flex-col h-screen justify-between">
        <Box className="z-50">
          <Box className="sticky top-0 z-50 shadow-md bg-white">
            <HeaderCustomer></HeaderCustomer>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center', backgroundColor: "#333", color: "white", height: "55px" }}>
              <Navbar dataCategory={newCate} />

            </Box>
          </Box>
          <Box>{children}</Box>

        </Box>

        <Box className="bottom-0">
          {
            isNotFooter ? <></> :
              <Footer />
          }
        </Box>
      </Box>
      <CartDrawer />
    </>

  );
};

export default LayoutCustomer;
