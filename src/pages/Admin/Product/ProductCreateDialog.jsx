/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogTitle,
  Slide,
  Button,
  Autocomplete,
  Box,
  TextField,
  Drawer,
  Stack,
  Typography,
  IconButton,
  Chip,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Field } from "../../../components/field";
import * as Yup from "yup";
import InputAdmin from "../../../components/input/InputAdmin";
import CloseIcon from "@mui/icons-material/Close";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "./api/productAction";
import Label from "../../../components/label/Label";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
// eslint-disable-next-line no-unused-vars
import ImageUploader from "quill-image-uploader";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import axios from "axios";

import * as colorAction from "../Color/api/colorAction";
import * as danhMucAction from "../DanhMuc/api/danhMucAction";
import * as typeAction from "../TypeProduct/api/typeAction";
import * as imageAction from "../Image/api/imageAction";
import RHFTextFieldNumber from "../../../components/gia/giaVND";
import { NumericFormat } from 'react-number-format';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const NumericFormatCustom = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
});


const ProductCreateDialog = (props) => {
  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
    price: Yup.string().required("Vui lòng nhập giá"),
    imageDetail: Yup.string()
      .required("Vui lòng chọn ảnh chi tiết").nullable(),
    category: Yup.string()
      .required("Vui lòng chọn danh mục").nullable(),
    type: Yup.string()
      .required("Vui lòng chọn loại ").nullable(),
    color: Yup.string()
      .required("Vui lòng chọn màu ").nullable(),
  });

  const defaultFilter = {
    name: "",
  };
  const [filter, setFilter] = useState(defaultFilter);
  const [formValue, setFormValue] = useState({
    danhMucId: {
      id: "",
      name: "",
    },
    typeProductId: { id: "", name: "" },
    colors: [],
    imageChildren: [],
  });
  const [thumb, setThumb] = useState("");
  const [typeFile, setTypeFile] = useState("");
  const fileRef = useRef(null);
  const [content, setContent] = useState("");
  const [isDragEnter, setIsDragEnter] = useState(false);
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };

  const {
    currentState,
    danhMucState,
    typeProductState,
    colorState,
    imageState,
  } = useSelector(
    (state) => ({
      currentState: state.products,
      danhMucState: state.categorys,
      typeProductState: state.typeProducts,
      colorState: state.colors,
      imageState: state.image,
    }),
    shallowEqual
  );
  const { data: danhMucData } = danhMucState;
  const { data: typeProductData } = typeProductState;
  const { data: colorData } = colorState;
  const { data: imageData } = imageState;
  const dispatch = useDispatch();


  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid, errors },
  } = useForm({
    //resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  useEffect(() => {
    dispatch(danhMucAction.fetchCategoryCustomer({ params: { ...filter } }));
    dispatch(typeAction.fetchTypeCustomer({ params: { ...filter } }));
    dispatch(colorAction.fetchColorCustomer({ params: { ...filter } }));
    dispatch(imageAction.fetchImageCustomer({ param: {} }));
  }, [dispatch, filter]);
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/api/image/upload-photo`,
            data: bodyFormData,
          });
          return response.data.image.image;
        },
      },
    }),
    []
  );
  const handleChangeImage = (e) => {
    if (
      e.target.files[0]?.type === "image/jpeg" ||
      e.target.files[0]?.type === "image/png" ||
      e.target.files[0]?.type === "image/jpg"
    ) {
      if (e.target && e.target.files[0]) {
        setTypeFile("image");
        setThumb(URL?.createObjectURL(e.target.files[0]));
      } else {
        toast.warning("Please choose file");
      }
    }
  };
  const onDragLeave = (e) => {
    setIsDragEnter(false);
  };

  const onDragEnter = (e) => {
    setIsDragEnter(true);
  };

  const onDrop = (e) => {
    setIsDragEnter(false);
    const newFile = URL?.createObjectURL(e.dataTransfer.files?.[0]);
    setTypeFile("image");
    setThumb(newFile);
  };
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Disable open image in new tab
    };
    window.addEventListener("dragover", handler);
    window.addEventListener("drop", handler);
    return () => {
      window.removeEventListener("dragover", handler);
      window.removeEventListener("drop", handler);
    };
  }, []);
  const handleResetFileChoosen = () => {
    setThumb(null);
  };
  useEffect(() => {
    if (props.isEdit) {
      const tranformDataImageChildren = props.data?.imageChildren?.map(
        (item) => ({
          id: item._id,
          name: item.name,
          image: item.image,
        })
      );
      const tranformDataColors = props.data?.colors.map((item) => ({
        id: item._id,
        name: item.name,
        imageColor: item.imageColor,
        sizes: item.sizes,
      }));
      const tranformDataDanhmuc = {
        id: props.data?.danhmuc._id,
        name: props.data?.danhmuc.name,
      };
      const tranformDataTypeProduct = {
        id: props.data?.typeProduct._id,
        name: props.data?.typeProduct.name,
      };
      setValue("name", props.data?.name);
      setValue("price", props.data?.price);
      setValue("priceDiscount", props.data?.discount);
      setThumb(props.data?.imageProduct);
      setFormValue({
        ...formValue,
        imageChildren: tranformDataImageChildren,
        colors: tranformDataColors,
        danhMucId: tranformDataDanhmuc,
        typeProductId: tranformDataTypeProduct,
      });
      setContent(props.data?.mota);
    } else {
      handleResetData();
    }
  }, [props.data, props.isEdit, setValue]);

  const handleSumitDanhMuc = async (values) => {
    if (!isValid) return;
    if (props.isEdit) {
      const tongSoLuongSanPham = formValue.colors?.reduce(
        (accumulator, item) =>
          accumulator +
          item.sizes?.reduce((acc, size) => acc + size.quantity, 0),
        0
      );
      const transformData = {
        id: props.data?._id,
        ...values,
        categoryId: formValue.danhMucId.id,
        imageChildren: formValue.imageChildren.map((item) => ({
          ...item,
          _id: item.id,
        })),
        colors: formValue.colors.map((item) => ({
          ...item,
          _id: item.id,
        })),
        typeProductId: formValue.typeProductId.id,
        mota: content,
        soLuongSanPham: tongSoLuongSanPham,
      };

      const formData = new FormData();
      const imageFile = document.getElementById("imageProduct");
      formData.append("image", imageFile.files[0]);
      formData.append("data", JSON.stringify(transformData));
      dispatch(actions.updateProduct(formData));
    } else {
      const tongSoLuongSanPham = formValue.colors?.reduce(
        (accumulator, item) =>
          accumulator +
          item.sizes?.reduce((acc, size) => acc + size.quantity, 0),
        0
      );
      const transformData = {
        ...values,
        categoryId: formValue.danhMucId.id,
        imageChildren: formValue.imageChildren.map((item) => ({
          ...item,
          _id: item.id,
        })),
        colors: formValue.colors.map((item) => ({
          ...item,
          _id: item.id,
        })),
        typeProductId: formValue.typeProductId.id,
        mota: content,
        soLuongSanPham: tongSoLuongSanPham,
      };

      const formData = new FormData();
      const imageFile = document.getElementById("imageProduct");
      formData.append("image", imageFile.files[0]);
      formData.append("data", JSON.stringify(transformData));
      dispatch(actions.createProduct(formData));
    }
    reset();
    handleResetData();
    props.closeCreateDialog(false);
  };
  const handleResetData = () => {
    setValue("name", "");
    setValue("price", "");
    setValue("priceDiscount", "");
    setThumb(null);
    setFormValue({
      danhMucId: {
        id: "",
        name: "",
      },
      typeProductId: { id: "", name: "" },
      colors: [],
      imageChildren: [],
    });
  };


  return (
    <>
      <Drawer
        open={props.open}
        TransitionComponent={Transition}
        anchor="right"
        sx={{ maxWidth: "450px !important" }}
        disableEscapeKeyDown
        aria-describedby="alert-dialog-slide-description">
        <Box sx={{ paddingX: "24px", paddingY: "24px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}>
            <Typography variant="h5">
              {props.isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
            </Typography>
            <IconButton title="Đóng">
              <CloseIcon onClick={handleCloseDialog} />
            </IconButton>
          </Stack>
          <form onSubmit={handleSubmit(handleSumitDanhMuc)}>
            <Stack direction="column" spacing={1} mb={3}>
              <Label>Tên sản phẩm:</Label>
              <InputAdmin type="text" control={control} name="name" />
              {errors && <p className="text-red-600">{errors.name?.message}</p>}
            </Stack>
            <Stack direction="row" spacing={1} mb={3}>
              <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
                <Label>Giá:</Label>
                {/* <InputAdmin type="text" control={control} name="price" /> */}
                <RHFTextFieldNumber
                  name="price"
                  control={control}
                  InputProps={{
                    inputComponent: NumericFormatCustom,
                    endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>
                  }}
                />
                {errors && (
                  <p className="text-red-600">{errors.price?.message}</p>
                )}
              </Stack>
              <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
                <Label>Phầm trăm giảm giá</Label>
                <InputAdmin
                  type="text"
                  control={control}
                  name="priceDiscount"
                />
              </Stack>
            </Stack>

            <Stack direction="column" spacing={1} mb={3} >
              <Label>Ảnh</Label>
              <label
                onDrop={onDrop}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                className={`border-dashed border border-green-500 cursor-pointer w-[530px] h-[250px] flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg relative group overflow-hidden`}>
                <input
                  ref={fileRef}
                  type="file"
                  name="image"
                  id="imageProduct"
                  className="hidden-input"
                  onChange={handleChangeImage}
                />
                {!thumb ? (
                  <div className="flex flex-col items-center text-center pointer-events-none py-5">
                    <img
                      srcSet="/img/upload-img.jpg"
                      alt="upload-img"
                      className="w-[200px] h-full mb-1 object-cover"
                    />
                    <p className="font-semibold">
                      Kéo thả vào đây hoặc chọn ảnh
                    </p>
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
            </Stack>
            <Stack direction="column" spacing={1} mb={3} sx={{ width: "530px" }}>
              <Label>Ảnh chi tiết: </Label>
              {/* <Controller
                name="imageDetail"
                control={control}
                render={({ field, fieldState: { error } }) => ( */}
              <Autocomplete
                fullWidth
                options={
                  imageData
                    ? imageData?.map((item) => {
                      return {
                        id: item._id,
                        name: item.name,
                        image: item.image,
                      };
                    })
                    : []
                }
                autoHighlight
                multiple
                // onChange={(event, newInputValue) => setValue("imageDetail", newInputValue, { shouldValidate: true })}
                disableCloseOnSelect
                value={formValue.imageChildren}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}

                onChange={(event, newInputValue) => {
                  setFormValue({
                    ...formValue,
                    imageChildren: newInputValue,
                  });
                }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}>
                    <Stack direction="row" spacing={2}>
                      <img
                        loading="lazy"
                        width="40px"
                        height="40px"
                        src={`${option?.image}`}
                        srcSet={`${option?.image} 2x`}
                        alt=""
                      />
                      <Typography variant="subtitle2">{option.name}</Typography>
                    </Stack>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chọn ảnh cho sản phẩm"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  // error={!!error}
                  // helperText={error && error?.message}
                  />
                )}
                renderTags={(tagValue, getTagProps) => {
                  return tagValue.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      label={option.name}
                      key={index}
                      avatar={
                        <img
                          loading="lazy"
                          width="40px"
                          height="40px"
                          src={`${option?.image}`}
                          srcSet={`${option?.image} 2x`}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                          alt=""
                        />
                      }
                    />
                  ));
                }}
              />
              {/* )} /> */}

            </Stack>
            <Stack direction="row" spacing={1} mb={3}>
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  width: "100%",
                }}>
                <Label>Danh mục</Label>
                {/* <Controller
                  name="category"
                  control={control}
                  render={({ field, fieldState: { error } }) => ( */}
                <Autocomplete
                  options={
                    danhMucData
                      ? danhMucData?.map((item) => ({
                        id: item._id,
                        name: item.name,
                      }))
                      : []
                  }
                  fullWidth
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  // onChange={(event, newInputValue) => setValue("category", newInputValue.id, { shouldValidate: true })}
                  onChange={(event, newInputValue) => {
                    setFormValue({
                      ...formValue,
                      danhMucId: newInputValue,
                    });
                  }}
                  value={formValue.danhMucId}
                  renderInput={(params) => <TextField {...params}
                  // error={!!error}
                  // helperText={error && error?.message}
                  />}
                />
                {/* )} /> */}

              </Stack>
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  width: "100%",
                }}>
                <Label>Loại sản phẩm</Label>
                {/* <Controller
                  name="type"
                  control={control}
                  render={({ field, fieldState: { error } }) => ( */}
                <Autocomplete
                  options={
                    typeProductData
                      ? typeProductData?.map((item) => {
                        return {
                          id: item._id,
                          name: item.name,
                        };
                      })
                      : []
                  }
                  fullWidth
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  value={formValue.typeProductId}
                  onChange={(event, newInputValue) => {
                    setFormValue({
                      ...formValue,
                      typeProductId: newInputValue,
                    });
                  }}
                  // onChange={(event, newInputValue) => setValue("type", newInputValue.id, { shouldValidate: true })}
                  renderInput={(params) =>
                    <TextField {...params}
                    // error={!!error}
                    // helperText={error && error?.message} 

                    />}
                />
                {/* )} /> */}

              </Stack>
            </Stack>
            <Stack direction="column" spacing={1} mb={3} sx={{ width: "530px" }}>
              <Label>Màu sắc</Label>
              {/* <Controller
                name="color"
                control={control}
                render={({ field, fieldState: { error } }) => ( */}
              <Autocomplete
                multiple
                fullWidth
                disableCloseOnSelect
                options={
                  colorData
                    ? colorData?.map((item) => {
                      return {
                        id: item._id,
                        name: item.name,
                        imageColor: item.imageColor,
                        sizes: item.sizes,
                      };
                    })
                    : []
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={formValue.colors}
                getOptionLabel={(option) => option.name}
                onChange={(event, newInputValue) => {
                  setFormValue({
                    ...formValue,
                    colors: newInputValue,
                  });
                }}
                autoHighlight
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}>
                    <Stack direction="row" spacing={2}>
                      <img
                        loading="lazy"
                        width="40px"
                        height="40px"
                        src={`${option?.imageColor}`}
                        srcSet={`${option?.imageColor} 2x`}
                        alt=""
                      />
                      <Typography variant="subtitle2">{option.name}</Typography>
                    </Stack>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chọn màu sắc cho sản phẩm"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                      // disable autocomplete and autofill
                    }}
                  // error={!!error}
                  // helperText={error && error?.message}
                  />

                )}
                renderTags={(tagValue, getTagProps) => {
                  return tagValue.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      label={option.name}
                      key={index}
                      avatar={
                        <img
                          loading="lazy"
                          width="40px"
                          height="40px"
                          src={`${option?.imageColor}`}
                          srcSet={`${option?.imageColor} 2x`}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                          alt=""
                        />
                      }
                    />
                  ));
                }}
              />
              {/* )}
              /> */}




            </Stack>
            <Stack direction="column" spacing={1} mb={3} sx={{ width: "530px" }}>
              <Field>
                <Label>Mô tả sản phẩm</Label>
                <div className="w-full entry-content quill">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    modules={modules}
                    onChange={setContent}
                  />
                </div>
              </Field>
            </Stack>
            <div className="flex items-center justify-end gap-x-3 mt-5 ">
              <Button
                variant="outlined"
                color="error"
                onClick={handleCloseDialog}
                type="button">
                Hủy
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {props.isEdit ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </form>
        </Box>
      </Drawer>
    </>
  );
};

export default ProductCreateDialog;
