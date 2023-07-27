import React, { useEffect, useState } from "react";
import ToggleButton from "../../../components/action/ToggleButton";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import { alpha, useTheme } from "@mui/material/styles";
import * as cartAction from "./_redux/cartAction";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Label from "../../../components/labelStatus/Label";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartDrawer = () => {
  const theme = useTheme();
  const { currentState, authState } = useSelector(
    (state) => ({
      currentState: state.cart, authState: state.auth
    }),
    shallowEqual
  );
  const { authToken } = authState;
  const { cart, cartTotalAmount } = currentState;
  const { cartQuantity } = cart;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
  const handleDeleAllCart = () => {
    dispatch(cartAction.clearCart());
  };
  useEffect(() => {
    dispatch(cartAction.getTotal());
  }, [dispatch, cart, cartQuantity]);
  const navigate = useNavigate();
  const handlePayment = () => {
    if (!authToken) {
      navigate("/payments/login")
    } else {
      navigate("/payments")
    }
  }
  return (
    <>
      {!open && <ToggleButton open={open} onToggle={handleToggle} />}
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        BackdropProps={{ invisible: true }}
        PaperProps={{
          sx: {
            width: 550,
            boxShadow: `-24px 12px 40px 0 ${alpha(
              theme.palette.mode === "light"
                ? theme.palette.grey[500]
                : theme.palette.common.black,
              0.16
            )}`,
          },
        }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2, pr: 1, pl: 1 }}>
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Giỏ hàng
          </Typography>

          <Tooltip title="Xóa tất cả">
            <Box sx={{ position: "relative" }}>
              <IconButton onClick={handleDeleAllCart}>
                <RefreshIcon />
              </IconButton>
            </Box>
          </Tooltip>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ borderStyle: "dashed" }} />
        {cart?.length > 0 ? (
          <Box m={1}>
            {cart &&
              cart.length > 0 &&
              cart.map((item) => (
                <Stack direction="row" spacing={1} mb={1}>
                  <Box>
                    <img
                      src={item.colors.imageColor}
                      alt=""
                      className="w-[120px] h-full object-fill rounded-lg"
                    />
                  </Box>
                  <Stack direction="column" spacing={0.5} flex={1} pr={0.5}>
                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      justifyContent="space-between"
                      sx={{ width: "100%" }}
                      mt={0.5}>
                      <Box>
                        <Typography variant="subtitle2">{item.name}</Typography>
                        <Typography variant="body2">
                          Màu:{" "}
                          <Label variant="soft" color="primary">
                            {item.colors.name}
                          </Label>
                        </Typography>
                        <Typography mt={0.5} variant="body2">
                          Size:{" "}
                          <Label variant="soft" color="success">
                            {item.sizes?.size?.name}
                          </Label>
                        </Typography>
                      </Box>
                      <Box className="flex flex-col items-end gap-y-1">
                        <IconButton>
                          <DeleteForeverIcon
                            className="text-red-500 cursor-pointer"
                            onClick={() => handleDeleToCart(item)}
                          />
                        </IconButton>
                        <div className="flex gap-x-2 items-center">
                          <div className="flex items-center h-[25px]">
                            <button
                              onClick={() => handleDecrement(item)}
                              className=" text-center w-[20px] h-full border cursor-pointer border-black text-black text-lg ">
                              -
                            </button>
                            <input
                              type="text"
                              value={item.cartQuantity || ""}
                              className="text-center w-[50px] h-full border border-blue-600  px-4"
                            />
                            <button
                              onClick={() => handleIncrement(item)}
                              className=" text-center w-[20px] h-full border cursor-pointer border-black text-black text-lg">
                              +
                            </button>
                          </div>
                        </div>
                        <Box>
                          <Typography variant="body2">
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
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <div className="py-8">
                <div className="flex items-center mb-1 justify-end text-lg text-slate-500">
                  <h4>Tổng số lượng sản phẩm:</h4>
                  <Typography className="text text-black text-lg px-2">
                    {cart?.reduce((total, ct) => total + ct.cartQuantity, 0)}
                  </Typography>
                </div>
                <div className="flex items-center mb-2 justify-end text-lg text-slate-500 ">
                  <h4>Tổng tiền : </h4>
                  <Typography className="text text-black text-lg px-2">
                    {cartTotalAmount.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </div>
              </div>
            </Stack>
            <Stack mb={5} direction="column" spacing={2}>
              <Button
                onClick={handlePayment}
                variant="contained"
                color="secondary"
                className="w-full">
                Tiến hành thanh toán
              </Button>
              <Button
                onClick={() => navigate("/cart")}
                variant="contained"
                color="secondary"
                className="w-full">
                Xem chi tiết giỏ hàng
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box>
            <h1 className="text-2xl text-center font-semibold pt-20">
              Giỏ hàng rỗng !! Vui lòng thêm sản phẩm
            </h1>
            <div className="p-10 flex justify-center">
              <Button
                variant="outlined"
                color="info"
                onClick={() => navigate("/")}>
                Chọn thêm sản phẩm
              </Button>
            </div>
          </Box>
        )}
      </Drawer>
    </>
  );
};

export default CartDrawer;
