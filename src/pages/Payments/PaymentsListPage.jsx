import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputAdmin from "../../components/input/InputAdmin";
import TextArea from "../../components/textarea/TextArea";
import LayoutCustomer from "../../layouts/LayoutCustomer";
import { PaymentType } from "../../utils/type";
import { generateRandomOrderId } from "../../utils/wrapperUtils";
import * as actions from "../Admin/Order/api/oderAction";
import * as tinhAction from "../Tinh/_redux/tinhAction";
import { isNull } from "lodash";
import { orderSlice } from "../Admin/Order/api/orderSlice";
import * as cartAction from "../Customer/cart/_redux/cartAction";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorPaymentDialog from "./ErrorPaymentDialog";
const PaymentsListPage = (props) => {
  const schemaValidation = Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Vui lòng nhập địa chỉ email hợp lệ"),
    fullName: Yup.string()
      .required("Vui lòng nhập Họ tên"),
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      .matches(/^\d{10}$/, "Số điện thoại phải có đúng 10 ký tự"),
    tinh: Yup.string()
      .required("Vui lòng chọn Tỉnh / TP ").nullable(),
    huyen: Yup.string()
      .required("Vui lòng chọn Quận / Huyện").nullable(),
    xa: Yup.string()
      .required("Vui lòng chọn Xã / Phường").nullable(),
    sonha: Yup.string()
      .required("Vui lòng nhập số nhà, tên đường"),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueCheckBox, setValueCheckBox] = useState(PaymentType.CASH);
  const handleChangeRadio = (e) => {
    setValueCheckBox(e.target.value);
  };

  useEffect(() => {
    dispatch(tinhAction.getAllTinh());
  }, [dispatch]);
  const { currentState, tinhState, authState, orderState } = useSelector(
    (state) => ({
      currentState: state.cart,
      tinhState: state.tinh,
      authState: state.auth,
      orderState: state.order,
    }),
    shallowEqual
  );
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
    defaultValues: {
      tinh: null,
      huyen: null,
      xa: null
    }
  });
  const { orderSuccess } = orderState;
  const { cart, cartTotalAmount } = currentState;
  const { data: listTinh } = tinhState;
  const { authToken } = authState;
  const [huyenData, setHuyenData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [ward, setWard] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [tinhData, setTinhData] = useState([]);
  const [errorList, setErrorList] = useState([])
  const [open, setOpen] = useState(false)
  const wTinh = watch("tinh")
  const wHuyen = watch("huyen")
  useEffect(() => {
    if (wTinh !== null) {
      const p = listTinh?.find((item) => {
        return item.name === wTinh;
      });
      if (p) {
        setHuyenData(p.districts);
      }
    }
  }, [listTinh, wTinh]);
  useEffect(() => {
    if (wHuyen != null) {
      const p = huyenData?.find((item) => {
        return item.name === wHuyen;
      });
      if (p) {
        setWardData(p.wards);
      }
    }
  }, [wHuyen, huyenData]);
  useEffect(() => {
    setDistricts(huyenData?.map((item) => item.name));
  }, [huyenData]);
  useEffect(() => {
    setTinhData(listTinh?.map((item) => item.name));
  }, [listTinh]);
  useEffect(() => {
    setWard(wardData?.map((item) => item.name));
  }, [wardData]);

  useEffect(() => {
    if (authToken) {
      const splitAddress = authState?.user?.address?.split(",")
      console.log(splitAddress);
      setValue("fullName", authState?.user.fullName)
      setValue("email", authState?.user.email)
      setValue("phone", authState?.user.phone)
      setValue("sonha", splitAddress[0])
      setValue("xa", splitAddress[1] === "null" ? null : splitAddress[1])
      setValue("huyen", splitAddress[2] === "null" ? null : splitAddress[2])
      setValue("tinh", splitAddress[3] === "null" ? null : splitAddress[3])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSumitDatHang = async (values) => {
    if (!authToken) {
      navigate("/payments/login");
    }
    else {
      const errorList = []
      const transID = generateRandomOrderId(8);
      const transFormData = {
        ...values,
        order_id: transID,
        hinhThucThanhToan: valueCheckBox === "cash" ? "Tiền mặt" : "ZaloPay",
        cart: cart,
        product_total: cart?.reduce((total, ct) => total + ct.cartQuantity, 0),
        price_total: cartTotalAmount,
        user_id: authState?.authToken?.user._id,
      };
      cart?.map(item => {
        if (item.cartQuantity >= item.sizes.quantity) {
          const temp = {
            name: item.name,
            size: item.sizes.size.name,
            soLuongTonKho: item.sizes.quantity,
            soLuongDatHang: item.cartQuantity
          }
          errorList.push(temp)
        }
        return null
      })
      if (errorList.length) {
        setOpen(true)
        setErrorList(errorList)
      }
      else {
        dispatch(actions.createOrder(transFormData));
      }
    }

  };
  useEffect(() => {
    if (!isNull(orderSuccess)) {
      navigate("/payments/success");
      dispatch(cartAction.deleteAllCartWhilePaymentSuccess());
      dispatch(orderSlice.actions.orderSuccess(null));
    }
  }, [dispatch, navigate, orderSuccess]);

  return (
    <LayoutCustomer isNotFooter>
      <form onSubmit={handleSubmit(handleSumitDatHang)}>
        <div className="max-w-[1200px] w-full flex mx-auto py-20">
          <div className="  basis-[50%] justify-start flex">
            <div className=" mt-5 px-5 ">
              <h4>Thông tin đặt hàng</h4>
              <div className=" gap-x-5 mt-3">
                <InputAdmin
                  label="Họ và Tên"
                  variant="outlined"
                  className="w-[350px]"
                  name="fullName"
                  control={control}
                  size="small"
                />
                {errors && <p className="text-red-600">{errors.fullName?.message}</p>}
              </div>
              <div className=" gap-x-5 mt-5">
                <InputAdmin
                  label="Email"
                  variant="outlined"
                  className="w-[350px]"
                  name="email"
                  control={control}
                  type="email"
                  size="small"
                // disabled

                />
                {errors && <p className="text-red-600">{errors.email?.message}</p>}
              </div>
              <div className=" gap-x-5 mt-5">
                <InputAdmin
                  label="Số điện thoại"
                  variant="outlined"
                  className="w-[350px]"
                  name="phone"
                  type='number'
                  control={control}
                  size="small"
                />
                {errors && <p className="text-red-600">{errors.phone?.message}</p>}
              </div>
              <div className=" gap-x-5 mt-5">
                <Controller
                  name="tinh"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      style={{ width: "100%" }}
                      options={tinhData || []}
                      getOptionLabel={(option) => option}
                      value={field.value}
                      onChange={(event, newValue) => setValue("tinh", newValue, { shouldValidate: true })}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Tỉnh / Thành Phố"
                          name="tinh"
                          className="w-[350px]"
                          size="small"
                          error={!!error}
                          helperText={error && error?.message}
                        />
                      )}
                    />
                  )} />
              </div>
              <div className="flex gap-x-5 mt-5">
                <Controller
                  name="huyen"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      style={{ width: "100%" }}
                      options={districts || []}
                      getOptionLabel={(option) => option}
                      value={field.value}
                      onChange={(event, newInputValue) => setValue("huyen", newInputValue, { shouldValidate: true })}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Quận / Huyện"
                          name="huyen"
                          className="w-[350px]"
                          size="small"
                          error={!!error}
                          helperText={error && error?.message}
                        />
                      )}
                    />
                  )} />
              </div>
              <div className="flex gap-x-5 mt-5">
                <Controller
                  name="xa"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      style={{ width: "100%" }}
                      options={ward || []}
                      value={field.value}
                      onInputChange={(event, newInputValue) => setValue("xa", newInputValue, { shouldValidate: true })}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Xã / Phường "
                          defaultValue=" "
                          name="xa"
                          className="w-[350px]"
                          size="small"
                          error={!!error}
                          helperText={error && error?.message}
                        />
                      )}
                    />
                  )} />
              </div>
              <div className=" gap-x-5 mt-5 ">
                <InputAdmin
                  label="Số nhà / Tên đường"
                  variant="outlined"
                  className="w-[350px]"
                  name="sonha"
                  size="small"
                  control={control}
                />
                {errors && <p className="text-red-600">{errors.sonha?.message}</p>}
              </div>
              <div className="flex gap-x-5 mt-5 mb-5 ">
                <TextArea
                  label="Ghi chú"
                  className="w-[350px] "
                  name="ghichu"
                  placeholder="Ghi chú..."
                  control={control}
                />
              </div>
            </div>
            <div className="mt-5 pr-5 flex-1">
              <h4>Phương thức thanh toán</h4>
              <div className="flex h-[50px] w-[300px] items-center border-solid border-2 rounded-lg  px-5 my-3">
                <input
                  id="cash"
                  name="thanhtoan"
                  type="radio"
                  defaultChecked
                  className="w-10 h-5"
                  value={PaymentType.CASH}
                  onChange={handleChangeRadio}
                />
                <label htmlFor="cash">Thanh toán khi nhận hàng</label>
              </div>
              <div className="flex h-[50px] w-[300px] items-center border-solid border-2 rounded-lg px-5 mb-3 jus  ">
                <input
                  id="zalopay"
                  name="thanhtoan"
                  type="radio"
                  className="w-10 h-5"
                  value={PaymentType.VIZALOPAY}
                  onChange={handleChangeRadio}
                  disabled
                />
                <label htmlFor="zalopay">Thanh toán trực tuyến Zalopay</label>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-slate-200">
            <div className="mt-1 p-4 ">
              <h2>Đơn hàng</h2>
              <Box m={1}>
                {cart &&
                  cart.length > 0 &&
                  cart.map((item) => (
                    <Stack direction="row" spacing={1} mb={1}>
                      <Box>
                        <img
                          src={item.colors.imageColor}
                          alt=""
                          className="w-[65px] h-[50px] object-fill rounded-lg"
                        />
                      </Box>
                      <Stack direction="column" spacing={0.5} flex={1} pr={0.5}>
                        <Stack
                          direction="row"
                          alignItems="flex-start"
                          justifyContent="space-between"
                          sx={{ width: "100%" }}
                          mt={0.5}>
                          <Box className="">
                            <Box
                              variant="subtitle2"
                              className=" text-base font-semibold">
                              {item.name}
                            </Box>
                            <Box variant="subtitle2" className="text-sm ">
                              Màu: {item.colors.name}
                            </Box>
                            <Box variant="subtitle2" className="text-sm">
                              Size: {item.sizes?.size?.name}
                            </Box>
                            <Box variant="subtitle2" className="text-sm">
                              Số lượng: {item.cartQuantity}
                            </Box>
                          </Box>
                          <Box className="flex flex-col items-end gap-y-1 py-10">
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
                <hr />
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  className=" py-2">
                  <p className=" text-base">Số lượng : </p>
                  <Typography variant="body2">
                    {cart?.reduce((total, ct) => total + ct.cartQuantity, 0)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between">
                  <p className=" text-base">Tạm tính : </p>
                  <Typography variant="body2">
                    {cartTotalAmount.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  className="py-2">
                  <p className=" text-base">Phí vận chuyển : </p>
                  <Typography>Miễn phí</Typography>
                </Stack>
                <hr />
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  className="py-3">
                  <h3>Tổng tiền : </h3>
                  <Typography className="text text-blue-600 text-lg">
                    {cartTotalAmount.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </Stack>
                <hr />
                <Stack
                  mb={5}
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  className="py-3">
                  <Button
                    onClick={() => navigate("/cart")}
                    color="inherit"
                    className="w-[50%]">
                    <KeyboardDoubleArrowLeftIcon />
                    Quay về giỏ hàng
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="w-[50%] h-[40px]"
                    type="submit">
                    Đặt hàng
                    <DownloadDoneIcon />
                  </Button>
                </Stack>
              </Box>
            </div>
          </div>
        </div>
      </form>
      {open && (
        <ErrorPaymentDialog open onClose={() => setOpen(false)} dataError={errorList} />
      )}
    </LayoutCustomer>
  );
};
export default PaymentsListPage;
