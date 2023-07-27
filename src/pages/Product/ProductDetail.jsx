import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Label from "../../components/labelStatus/Label";
import LayoutCustomer from "../../layouts/LayoutCustomer";
import * as actions from "../Admin/Product/api/productAction";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { toast } from "react-toastify";
import * as cartAction from "../Customer/cart/_redux/cartAction"


const ProductDetail = () => {
    const { id } = useParams();
    const { currentState } = useSelector(
        (state) => ({
            currentState: state.product,
            cartState: state.cart

        }),
        shallowEqual
    );
    const { data: dataDetail } = currentState;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchProductById(id));
    }, [dispatch, id]);

    const [dataImages, setDataImages] = useState({});
    const [dataSizes, setDataSizes] = useState([])
    const [totalSizeProduct, setTotalSizeProduct] = useState(0)
    const [idSelectedColor, setIdSelectedColor] = useState("")
    const [idSelectedSize, setIdSelectedSize] = useState("")

    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        const id = dataDetail?.colors?.[0]._id
        setIdSelectedColor(id)
    }, [dataDetail])
    useEffect(() => {
        const id = dataDetail?.colors?.[0].sizes?.[0]._id
        setIdSelectedSize(id)
    }, [dataDetail])
    useEffect(() => {
        setDataImages(dataDetail);
    }, [dataDetail]);
    const handleClickImage = (item) => {
        const newData = {
            ...item,
            imageProduct: item.image || item.imageProduct
        }
        setDataImages(newData);
    };
    useEffect(() => {
        if (dataDetail) {
            const firstSizes = dataDetail?.colors?.[0].sizes
            setDataSizes(firstSizes)
        }
    }, [dataDetail])
    useEffect(() => {
        if (idSelectedColor) {
            const findColor = dataDetail?.colors?.filter(item => item._id === idSelectedColor)
            const id = findColor?.[0].sizes?.[0]._id
            const totalQuantitySize = findColor?.[0].sizes?.[0]?.quantity
            setIdSelectedSize(id)
            setTotalSizeProduct(totalQuantitySize)
        }
    }, [dataDetail?.colors, idSelectedColor])
    const handleChooseColor = (item) => {
        setDataSizes(item.sizes)
        setIdSelectedColor(item._id)
    }
    const handleChooseSize = (item) => {
        setTotalSizeProduct(item.quantity)
        setIdSelectedSize(item._id)
    }
    // const isChoosen = idSelectedColor !== "" || idSelectedSize !== ""
    // const isChoosenMau = idSelectedColor === ""

    // const handleResetChoosen = () => {
    //     setIdSelectedColor("")
    //     setIdSelectedSize("")
    //     setTotalSizeProduct(0)
    // }
    const handleDecrement = () => {
        if (quantity <= 1) {
            toast.info("Số lượng sản phẩm phải lớn hơn 0")
            return null
        }
        setQuantity(quantity - 1)
    }
    const handleIncrement = () => {
        if (quantity >= totalSizeProduct) {
            toast.warning("Bạn đã chọn mua quá số lượng trong kho. Vui lòng liên hệ shop.")
            return null;
        }
        else {
            setQuantity(quantity + 1)
        }

    }

    const handleChange = e => {
        if (e.target.value > totalSizeProduct) {
            toast.warning("Bạn đã chọn mua quá số lượng trong kho. Vui lòng liên hệ shop.")
        } else {
            setQuantity(Number(e.target.value))
        }
    }
    const handleAddToCart = (product) => {
        if (quantity === 0) {
            return toast.warning("Số lượng sản phẩm phải lớn hơn 1.")
        }
        const findColor = dataDetail.colors?.find(item => item._id === idSelectedColor)
        if (findColor) {
            const findSize = findColor.sizes.find(item => item._id === idSelectedSize)
            const cloneValues = {
                ...product,
                colors: findColor,
                sizes: findSize,
                cartQuantity: quantity
            };
            dispatch(cartAction.addToCart(cloneValues));
        }
    };

    return (
        <>
            <LayoutCustomer>
                <div className="p-4 mx-auto w-full max-w-[1200px] pt-[44px]">
                    <div className="flex gap-x-5 mt-5">
                        <div className="basis-[60%] flex flex-col">
                            {dataImages && (
                                <img
                                    src={dataImages?.imageProduct}
                                    alt=""
                                    className="w-full h-[397px] object-fill border border-dashed border-green-600 rounded-lg"
                                />
                            )}
                            <Stack direction="row" spacing={2} mt={2} alignItems="flex-start" justifyContent="flex-start">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => handleClickImage(dataDetail)}
                                >
                                    <img
                                        src={dataDetail?.imageProduct}
                                        alt=""
                                        className="w-full h-[120px] border border-slate-800 border-dashed object-fill rounded-lg"
                                    />
                                </div>
                                {dataDetail?.imageChildren?.map((item) => (

                                    <div
                                        className="cursor-pointer"
                                        key={item._id}
                                        onClick={() => handleClickImage(item)}
                                    >
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-full h-[120px] border border-slate-800 border-dashed object-fill rounded-lg"
                                        />
                                    </div>

                                ))}
                            </Stack>
                        </div>
                        <div className="basis-[40%]">
                            <h1 className="py-4 text-4xl font-semibold">{dataDetail?.name}</h1>
                            <hr />
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={5}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {dataDetail?.discount ? (
                                        <span className="text-md font-semibold text-gray-900 dark:text-white line-through">
                                            {dataDetail.price.toLocaleString("vi", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    ) : (
                                        <span className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {dataDetail?.price?.toLocaleString("vi", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    )
                                    }
                                    {dataDetail?.discount && (
                                        <span className="text-xl font-semibold text-red-600 dark:text-white">
                                            {dataDetail?.price_discount?.toLocaleString("vi", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    )}
                                </Stack>
                                {/* {isChoosen && (
                                    <Button variant="outlined" color="error" size="small" onClick={handleResetChoosen}>Bỏ chọn tất cả</Button>
                                )} */}
                            </Stack>
                            <Typography className="font-semibold text-lg">Màu</Typography>
                            <Stack direction="row" spacing={2} my={2} alignItems="flex-start">

                                {dataDetail?.colors?.map((item) => (
                                    <Stack direction="column" spacing={2} alignItems="flex-start">
                                        <div
                                            className="cursor-pointer"
                                            key={item._id}
                                            onClick={() => handleChooseColor(item)}
                                        >
                                            <img
                                                src={item.imageColor}
                                                alt=""
                                                className={`"w-full h-[90px]  ${idSelectedColor === item._id ? "border-10 border-blue-600" : "border border-slate-800"} border-solid object-fill rounded-lg"`}
                                            />
                                        </div>
                                        <span className="text-center text-sm">{item.name}</span>
                                    </Stack>
                                ))}
                            </Stack>

                            <Stack direction="column" spacing={2}>
                                <Typography className="font-semibold text-lg">Sizes</Typography>
                                <Stack direction="row" spacing={1}>
                                    {dataSizes && dataSizes.map(item => (
                                        <Label onClick={() => handleChooseSize(item)} variant="soft" color={`${idSelectedSize === item._id ? "success" : "default"}`} className="w-[40px] h-[40px] text-lg cursor-pointer">{item.size.name}</Label>
                                    ))}
                                </Stack>

                                {totalSizeProduct > 0 && (
                                    <Typography className="font-medium text-md text-red-700">Số lượng sản phẩm: {totalSizeProduct}</Typography>

                                )}
                            </Stack>

                            <Stack my={2}>
                                {
                                    totalSizeProduct === 0 ? (
                                        <Typography className="font-medium text-md text-red-700">Sản phẩm tạm hết hàng</Typography>
                                    ) : (
                                        <div className="flex items-center h-[28px] gap-x-1">
                                            <Button
                                                onClick={() => handleDecrement()}
                                                variant="outlined"
                                                size="small"
                                            >
                                                -
                                            </Button>
                                            <input
                                                type="number"
                                                value={quantity}
                                                onChange={handleChange}
                                                className="text-center w-[50px] h-full border-1 border-blue-500 border-solid px-2"
                                            />
                                            <Button
                                                onClick={() => handleIncrement()}
                                                variant="outlined"
                                                size="small"
                                            >
                                                +
                                            </Button>
                                        </div>
                                    )
                                }
                            </Stack>

                            <Stack my={5} >
                                <Button variant="outlined" onClick={() => handleAddToCart(dataDetail)} disabled={quantity !== 0 && typeof quantity !== "number"} color="secondary" className="normal-case" endIcon={<ShoppingCartCheckoutIcon />}>Thêm vào giỏ hàng</Button>
                            </Stack>

                        </div>
                    </div>
                    <Stack my={5} direction="column" spacing={2}>
                        <h3 className="py-4 text-2xl font-semibold"> Mô tả sản phẩm</h3>
                        <Stack >
                            <div
                                className=""
                                dangerouslySetInnerHTML={{ __html: `${dataDetail?.mota}` }}
                            ></div>
                        </Stack>
                    </Stack>
                </div>


            </LayoutCustomer>

        </>
    );

}
export default ProductDetail;