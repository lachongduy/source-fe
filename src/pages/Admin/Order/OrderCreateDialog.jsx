import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import {
    Autocomplete,
    Box,
    Button,
    Drawer,
    IconButton,
    Slide,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import * as actions from "../Order/api/oderAction";
import * as tinhAction from "../../Tinh/_redux/tinhAction";
import * as Yup from "yup";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { yupResolver } from "@hookform/resolvers/yup";
import LayoutCustomer from "../../../layouts/LayoutCustomer";
import InputAdmin from "../../../components/input/InputAdmin";
import TextArea from "../../../components/textarea/TextArea";
import { PaymentType } from "../../../utils/type";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { generateRandomOrderId } from "../../../utils/wrapperUtils";
import { Label } from "@mui/icons-material";
const OrderCreateDialog = (props) => {
    const schemaValidation = Yup.object().shape({
        email: Yup.string()
            .required("Vui lòng nhập email")
            .email("Vui lòng nhập địa chỉ email hợp lệ"),
        fullName: Yup.string()
            .required("Vui lòng nhập Họ tên"),
        phone: Yup.string()
            .required("Vui lòng nhập số điện thoại"),
        tinh: Yup.string()
            .required("Vui lòng chọn Tỉnh / TP ").nullable(),
        huyen: Yup.string()
            .required("Vui lòng chọn Quận / Huyện").nullable(),
        xa: Yup.string()
            .required("Vui lòng chọn Xã / Phường").nullable(),
        sonha: Yup.string()
            .required("Vui lòng nhập số nhà, tên đường"),
    });
    const handleCloseDialog = () => {
        props.closeCreateDialog(false);
        setValue("name", "");
    };
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
    });
    // const { orderSuccess } = orderState;
    const defaultValues = {
        tinh: "",
        huyen: "",
        xa: "",
    };
    const { cart, cartTotalAmount } = currentState;
    const { data: listTinh } = tinhState;
    const { authToken } = authState;
    const [formValues, setFormValues] = useState(defaultValues);
    const [huyenData, setHuyenData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [ward, setWard] = useState([]);
    const [wardData, setWardData] = useState([]);
    const [tinhData, setTinhData] = useState([]);
    const wTinh = watch("tinh")
    const wHuyen = watch("huyen")
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
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


    const handleSumitDatHang = async (values) => {
        const transID = generateRandomOrderId(8);
        const transFormData = {
            ...formValues,
            ...values,
            order_id: transID,
            hinhThucThanhToan: valueCheckBox === "cash" ? "Tiền mặt" : "ZaloPay",
            cart: cart,
            product_total: cart?.reduce((total, ct) => total + ct.cartQuantity, 0),
            price_total: cartTotalAmount,
            user_id: authState?.authToken?.user._id,
        };
        dispatch(actions.createOrder(transFormData));
    };
    useEffect(() => {
        if (authToken) {
            setValue("fullName", authToken?.user.fullName)
            setValue("email", authToken?.user.email)
        }
    }, [])

    return (
        <>
            <Drawer
                open={props.open}
                TransitionComponent={Transition}
                anchor="right"
                sx={{ maxWidth: "1000px !important" }}
                disableEscapeKeyDown
                aria-describedby="alert-dialog-slide-description">
                <Box sx={{ paddingX: "24px", paddingY: "24px", width: "950px" }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={2}>
                        <Typography variant="h5">
                            {props.isEdit ? "Cập nhật đơn hàng" : "Thêm đơn hàng mới"}
                        </Typography>
                        <IconButton title="Đóng" onClick={handleCloseDialog}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <form onSubmit={handleSubmit(handleSumitDatHang)}>
                        <div className=" bg-slate-100  pl-10 basis-[65%] flex">
                            <div className=" mt-5 px-10 ">
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
                            <div className=" mt-5 px-10 flex-1 ">
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
                                    />
                                    <label htmlFor="zalopay">Thanh toán trực tuyến Zalopay</label>
                                </div>
                            </div>
                        </div>
                        <div className=" bg-slate-200   basis-[35%]">
                            <div className="mt-1 p-4 ">
                                <h2>Đơn hàng</h2>
                                <Box m={1}>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        justifyContent="space-between"
                                        className=" py-2">
                                        <p className=" text-base">Sản phẩm : </p>

                                    </Stack>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        justifyContent="space-between"
                                        className=" py-2">
                                        <p className=" text-base">Màu sắc : </p>

                                    </Stack>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        justifyContent="space-between"
                                        className=" py-2">
                                        <p className=" text-base">Size : </p>

                                    </Stack>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        justifyContent="space-between"
                                        className=" py-2">
                                        <p className=" text-base">Số lượng : </p>

                                    </Stack>
                                    <hr />
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        justifyContent="space-between">
                                        <p className=" text-base">Tạm tính : </p>

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

                                    </Stack>
                                    <hr />
                                    <Stack
                                        mb={5}
                                        direction="row"
                                        spacing={2}
                                        justifyContent="space-between"
                                        className="py-3">
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            className="w-[50%] h-[50px]"
                                            onClick={handleCloseDialog}
                                            startIcon={<HighlightOffIcon />}
                                            type="button">
                                            Hủy
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className="w-[50%] h-[50px]"
                                            type="submit">
                                            Đặt hàng
                                            <DownloadDoneIcon />
                                        </Button>
                                    </Stack>
                                </Box>
                            </div>
                        </div>
                    </form>
                </Box>
            </Drawer>
        </>
    );
};

export default OrderCreateDialog;
