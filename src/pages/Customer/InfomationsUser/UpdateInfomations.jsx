import React, { useEffect, useState } from 'react';
import InputAdmin from '../../../components/input/InputAdmin';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Button, FormControlLabel, Radio, RadioGroup, TextField, } from '@mui/material';
import LayoutCustomer from '../../../layouts/LayoutCustomer';
import { shallowEqual } from 'react-intl/src/utils';
import { useDispatch, useSelector } from 'react-redux';
import * as tinhAction from "../../Tinh/_redux/tinhAction";
import Heading from '../../../components/header/Heading';
import { BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import * as actions from "../../Admin/User/api/userAction";
import { yupResolver } from '@hookform/resolvers/yup';
const UpdateInfomations = (props) => {
    const schemaValidation = Yup.object().shape({
        email: Yup.string()
            .required("Vui lòng nhập email")
            .email("Vui lòng nhập địa chỉ email hợp lệ"),
        fullName: Yup.string()
            .required("Vui lòng nhập Họ tên"),
        phone: Yup.string()
            .required("Vui lòng nhập số điện thoại")
            .matches(/^\d{10}$/, "Số điện thoại phải có đúng 10 ký tự"),
    });
    const [thumb, setThumb] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(tinhAction.getAllTinh());
    }, [dispatch]);
    const { tinhState, authState } = useSelector(
        (state) => ({
            tinhState: state.tinh,
            authState: state.auth,
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

    const { data: listTinh } = tinhState;
    const { authToken } = authState;
    const [gender, setgender] = React.useState('Nam');
    const [huyenData, setHuyenData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [ward, setWard] = useState([]);
    const [wardData, setWardData] = useState([]);
    const [tinhData, setTinhData] = useState([]);
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
            setValue("date", authState?.user.date)
            setgender(authState?.user.gender)
            setValue("phone", authState?.user.phone)
            setValue("sonha", splitAddress[0])
            setValue("xa", splitAddress[1] === "null" ? null : splitAddress[1])
            setValue("huyen", splitAddress[2] === "null" ? null : splitAddress[2])
            setValue("tinh", splitAddress[3] === "null" ? null : splitAddress[3])
            setThumb(authState?.user.image)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleChange = (event) => {
        setgender(event.target.value);
    };


    const handleChangeImage = (e) => {
        if (
            e.target.files[0]?.type === "image/jpeg" ||
            e.target.files[0]?.type === "image/png" ||
            e.target.files[0]?.type === "image/jpg"
        ) {
            if (e.target && e.target.files[0]) {
                setThumb(URL?.createObjectURL(e.target.files[0]));
            } else {
                toast.warning("Please choose file");
            }
        }
    };
    const handleResetFileChoosen = () => {
        setThumb(null);
    };


    const handleSumitImage = async () => {
        const formData = new FormData();
        const imageFile = document.getElementById("image");
        formData.append("image", imageFile.files[0]);
        dispatch(actions.uploadImageUser(formData));
    }
    const handleSumitUpdate = async (values) => {
        const cloneValueUpdate = {
            ...values,
            tinh: values.tinh === null ? null : values.tinh,
            huyen: values.huyen === null ? null : values.huyen,
            xa: values.xa === null ? null : values.xa,
            gender: gender,
            id: authState?.user?._id,
        }
        dispatch(actions.updateUser(cloneValueUpdate))
    }

    return (
        <LayoutCustomer>
            <div className="p-4 mx-auto w-full max-w-[1200px] items-center">
                <div className="  text-center ">
                    <Heading>
                        <span
                            className="hover:no-underline cursor-pointer text-black">
                            Thông tin tài khoản
                        </span>
                    </Heading>
                </div>
                <form onSubmit={handleSubmit(handleSumitUpdate)}>
                    <div className='flex max-w-[1200px] w-full'>
                        <div className='pl-10 px-10 mt-5 my-10 '>
                            <div className=" my-5 ">
                                <div className=" gap-x-5 mt-10">
                                    <InputAdmin
                                        label="Họ và Tên"
                                        variant="outlined"
                                        className="w-[700px]"
                                        name="fullName"
                                        control={control}
                                    />
                                    {errors && <p className="text-red-600">{errors.fullName?.message}</p>}
                                </div>
                                <div className=" gap-x-5 mt-10">
                                    <InputAdmin
                                        label="Email"
                                        variant="outlined"
                                        className="w-[700px]"
                                        name="email"
                                        control={control}
                                        type="email"
                                    />
                                    {errors && <p className="text-red-600">{errors.email?.message}</p>}
                                </div>
                                <div className=" gap-x-5 mt-10 flex items-center">
                                    <div  >
                                        <p className='pl-2'>Ngày sinh</p>
                                        <InputAdmin
                                            variant="outlined"
                                            className="w-[350px]"
                                            name="date"
                                            control={control}
                                            type="date"
                                        />
                                    </div>

                                    <div className='pl-10'>
                                        <p >Giới tính</p>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={gender}
                                            onChange={handleChange}
                                            row
                                        >
                                            <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                                            <FormControlLabel value="Nu" control={<Radio />} label="Nữ" />
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className=" gap-x-5 mt-10">
                                    <InputAdmin
                                        label="Số điện thoại"
                                        variant="outlined"
                                        className="w-[700px]"
                                        name="phone"
                                        type='number'
                                        control={control}
                                    />
                                    {errors && <p className="text-red-600">{errors.phone?.message}</p>}
                                </div>
                                <div className=" gap-x-5 mt-10">
                                    <Controller
                                        name="tinh"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Autocomplete
                                                style={{ width: "100%", backgroundColor: 'white' }}
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
                                                        className="w-[700px]"
                                                        error={!!error}
                                                        helperText={error && error?.message}
                                                    />
                                                )}
                                            />
                                        )} />
                                </div>
                                <div className="flex gap-x-5 mt-10">
                                    <Controller
                                        name="huyen"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Autocomplete
                                                style={{ width: "100%", backgroundColor: 'white' }}
                                                options={districts || []}
                                                value={field.value}
                                                getOptionLabel={(option) => option}
                                                onChange={(event, newInputValue) => setValue("huyen", newInputValue, { shouldValidate: true })}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        label="Quận / Huyện"
                                                        name="huyen"
                                                        className="w-[700px]"
                                                        error={!!error}
                                                        helperText={error && error?.message}
                                                    />
                                                )}
                                            />
                                        )} />
                                </div>
                                <div className="flex gap-x-5 mt-10">
                                    <Controller
                                        name="xa"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Autocomplete
                                                style={{ width: "100%", backgroundColor: 'white' }}
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
                                                        className="w-[700px]"
                                                        error={!!error}
                                                        helperText={error && error?.message}
                                                    />
                                                )}
                                            />
                                        )} />
                                </div>
                                <div className=" gap-x-5 mt-10 ">
                                    <InputAdmin
                                        label="Số nhà / Tên đường"
                                        variant="outlined"
                                        className="w-[700px]"
                                        name="sonha"
                                        control={control}
                                    />
                                    {errors && <p className="text-red-600">{errors.sonha?.message}</p>}
                                </div>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Cập nhật
                            </Button>
                        </div>

                        <div className="my-10  ">
                            <div className='h-[400px] w-[400px] border-solid border-2 rounded-lg'>
                                <label
                                    className={`cursor-pointer  h-full flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg relative group overflow-hidden border border-dotted border-green-500`}>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="hidden-input"
                                        onChange={handleChangeImage}
                                    />
                                    {!thumb ? (
                                        <div className="flex flex-col items-center text-center pointer-events-none py-4">
                                            <img
                                                srcSet="/img/upload-img.jpg"
                                                alt="upload-img"
                                                className="w-[200px] h-full mb-1 object-cover"
                                            />
                                            <p className="font-semibold">Chọn ảnh</p>
                                        </div>
                                    ) : (
                                        <React.Fragment>
                                            <img
                                                src={thumb}
                                                className="w-full h-full object-cover"
                                                alt=""
                                            />
                                            <button
                                                className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer z-10  opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible"
                                                onClick={handleResetFileChoosen}
                                                type="button">
                                                <BsTrash className="text-red-500 text-4xl"></BsTrash>
                                            </button>
                                        </React.Fragment>
                                    )}
                                </label>
                            </div>
                            <div className='mt-3'>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    type="button"
                                    onClick={handleSumitImage}
                                >

                                    Lưu ảnh
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </LayoutCustomer>
    );
};

export default UpdateInfomations;