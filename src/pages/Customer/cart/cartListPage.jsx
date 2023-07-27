import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual } from "react-intl/src/utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Heading from "../../../components/header/Heading";
import LayoutCustomer from "../../../layouts/LayoutCustomer";
import * as cartAction from "./_redux/cartAction";
import { toast } from "react-toastify";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    //backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 1,
  },
}));
const CartListPage = () => {
  const { currentState, authState } = useSelector(
    (state) => ({
      currentState: state.cart, authState: state.auth
    }),
    shallowEqual
  );
  const { authToken } = authState
  const { cart, cartTotalAmount } = currentState;
  const { cartQuantity } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleToCart = (item) => {
    dispatch(cartAction.deleteToCart(item));
  };
  const handleIncrement = (item) => {
    if (item.cartQuantity >= item.sizes.quantity) {
      toast.warning("Bạn đã chọn mua quá số lượng trong kho. Vui lòng liên hệ shop.")
    } else {
      dispatch(cartAction.increaseCart(item));
    }
  };
  const handleDecrement = (item) => {
    dispatch(cartAction.decreaseCart(item));
  };

  useEffect(() => {
    dispatch(cartAction.getTotal());
  }, [dispatch, cart, cartQuantity]);
  const handleDeleAllCart = () => {
    dispatch(cartAction.clearCart());
  };

  const handlePayment = () => {
    if (!authToken) {
      navigate("/payments/login")
    } else {
      navigate("/payments")
    }
  }
  return (
    <LayoutCustomer>
      <div className="p-4 mx-auto w-full max-w-[1200px] pt-[88px]">
        {cart?.length > 0 ? (
          <div className="p-4">
            <div className="flex items-start justify-between">
              <Heading>Giỏ hàng</Heading>
              <Button
                onClick={() => handleDeleAllCart()}
                variant="contained"
                color="error">
                Xóa tất cả trong giỏ hàng
              </Button>
            </div>
            <hr />
            <div className="flex  mt-5">
              <div className="w-full py-4 px-2 bg-slate-100 shadow-lg rounded-lg">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Sản phẩm</StyledTableCell>
                        <StyledTableCell>Tên sản phẩm </StyledTableCell>
                        <StyledTableCell>Size</StyledTableCell>
                        <StyledTableCell>Đơn giá</StyledTableCell>
                        <StyledTableCell className="px-12">
                          Số lượng
                        </StyledTableCell>
                        <StyledTableCell>Xóa</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.map((item) => (
                        <StyledTableRow key={item.name}>
                          <StyledTableCell component="th" scope="row">
                            <img
                              src={item.colors.imageColor}
                              alt=""
                              className="w-[100px] h-[80px] object-fill rounded-lg"
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <span className="text-lg font-semibold">
                              {item.name}
                            </span>
                            <br />
                            Màu:{" "}
                            <span className="font-extralight">
                              {item.colors.name}
                            </span>
                          </StyledTableCell>
                          <StyledTableCell className="text-red-600">
                            {item.sizes.size.name}
                          </StyledTableCell>
                          <StyledTableCell>
                            <div className=" flex items-center gap-x-2">
                              <span className="text-sm font-semibold">
                                {item.price_discount
                                  ? (
                                    item.price_discount * item.cartQuantity
                                  ).toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                  })
                                  : (
                                    item.discount * item.cartQuantity
                                  ).toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                              </span>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell>
                            <div className="basis-[50%] flex gap-x-2 items-center">
                              <div className="flex items-center h-[35px]">
                                <button
                                  onClick={() => handleDecrement(item)}
                                  className=" text-center w-[50px] h-full border cursor-pointer border-black  px-4 text-black text-xl ">
                                  -
                                </button>
                                <input
                                  type="text"
                                  value={item.cartQuantity || ""}
                                  className="text-center w-[50px] h-full border border-blue-600  px-4"
                                />
                                <button
                                  onClick={() => handleIncrement(item)}
                                  className=" text-center w-[50px] h-full border cursor-pointer border-black px-4   text-black text-xl">
                                  +
                                </button>
                              </div>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell>
                            <IconButton>
                              <DeleteForeverIcon
                                className="text-red-500 cursor-pointer"
                                onClick={() => handleDeleToCart(item)}
                              />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="py-8">
                  <div className="flex items-center mb-3 justify-end text-lg">
                    <h4>Tổng số lượng sản phẩm:</h4>
                    <Typography className="text text-blue-600 text-lg px-5">
                      {cart?.reduce((total, ct) => total + ct.cartQuantity, 0)}
                    </Typography>
                  </div>
                  <div className="flex items-center mb-5 justify-end text-lg font-semibold">
                    <h4>Tổng tiền : </h4>
                    <Typography className="text text-blue-600 text-lg px-5">
                      {cartTotalAmount.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </div>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => navigate("/")}>
                      Chọn thêm sản phẩm khác
                    </Button>
                    <Button
                      onClick={handlePayment}
                      variant="contained"
                      color="secondary">
                      Tiến hành thanh toán
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* <img
                            srcSet="/img/empty-cart.png"
                            alt=""
                            className="w-full h-[80vh] object-cover"
                        /> */}
            <h1 className="text-2xl absolute inset-0 text-center top-[8%] font-semibold">
              Giỏ hàng rỗng !! Vui lòng thêm sản phẩm
            </h1>
          </div>
        )}
      </div>
    </LayoutCustomer>
  );
};

export default CartListPage;
