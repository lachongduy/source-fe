/* eslint-disable react-hooks/exhaustive-deps */
// import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
// import * as Yup from "yup";
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
import { useForm } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import InputAdmin from "../../../components/input/InputAdmin";
import Label from "../../../components/label/Label";
import * as sizeActions from "../Sizes/api/sizeAction";
import { LabelStatus } from "../../../components/labelStatus";
import * as actions from "./api/colorAction";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ColorCreateDialog = (props) => {
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const [, setTypeFile] = useState("");
  const [thumb, setThumb] = useState("");
  const dispatch = useDispatch();
  const { currentState } = useSelector(
    (state) => ({ currentState: state.sizes }),
    shallowEqual
  );
  const [formValues, setFormValues] = useState({ sizes: [] });
  // const schemaValidation = Yup.object().shape({
  //   name: Yup.string().required("Vui lòng nhập tên màu"),
  //   select: Yup.string().required("Vui lòng chọn size"),
  //   number: Yup.string().required("Vui lòng nhập số lượng"),
  // });
  const { data } = currentState;
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid, errors },
  } = useForm({
    // resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
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
  const handleResetFileChoosen = () => {
    setThumb(null);
  };
  useEffect(() => {
    dispatch(sizeActions.fetchSizeCustomer());
  }, [dispatch]);

  const handleSumitColor = async (values) => {

    if (!isValid) return;
    if (props.isEdit) {
      const { name, ...lastedValue } = values;
      const mappingSizeColor = formValues.sizes.map((item) => {
        const quantityKey = `quantity_${item.id}`;
        const quantity = lastedValue[quantityKey];
        return {
          sizeId: item.id,
          quantity: quantity,
        };
      });
      const tranFormData = {
        id: props.data?._id,
        name: values.name,
        sizeQuantities: mappingSizeColor,
      };
      const formData = new FormData();
      const imageFile = document.getElementById("imageColor");
      formData.append("image", imageFile.files[0]);
      formData.append("data", JSON.stringify(tranFormData));
      dispatch(actions.updateColor(formData));
    } else {
      const { name, ...lastedValue } = values;
      const mappingSizeColor = formValues.sizes.map((item) => {
        const quantityKey = `quantity_${item.id}`;
        const quantity = lastedValue[quantityKey];
        return {
          sizeId: item.id,
          quantity: quantity,
        };
      });
      const tranFormData = {
        name: values.name,
        sizeQuantities: mappingSizeColor,
      };
      const formData = new FormData();
      const imageFile = document.getElementById("imageColor");
      formData.append("image", imageFile.files[0]);
      formData.append("data", JSON.stringify(tranFormData));
      dispatch(actions.createColor(formData));
    }
    reset();
    setThumb("");
    setFormValues({
      name: "",
      sizes: [],
    });
    props.closeCreateDialog(false);
  };
  useEffect(() => {
    if (props.isEdit) {
      setValue("name", props.data?.name);
      setThumb(props.data?.imageColor);
      const tranformData = props.data?.sizes.map((item) => ({
        id: item.size._id,
        name: item.size.name,
      }));
      setFormValues({
        ...formValues,
        sizes: tranformData,
      });
      props.data.sizes.forEach((item) =>
        setValue(`quantity_${item.size._id}`, item.quantity)
      );
    } else {
      setValue("name", "");
      setThumb("");
      setFormValues({
        name: "",
        sizes: [],
      });
    }
  }, [props.data, props.isEdit, setValue]);

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
              {props.isEdit ? "Cập nhật màu sắc" : "Thêm màu sắc"}
            </Typography>
            <IconButton title="Đóng" onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <form onSubmit={handleSubmit(handleSumitColor)}>
            <Stack direction="column" spacing={1} mb={3}>
              <Label>Tên màu sắc:</Label>
              <InputAdmin type="text" control={control} name="name" />
              {errors && <p className="text-red-600">{errors.name?.message}</p>}
            </Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <Label>Ảnh màu sắc:</Label>
              <label
                className={`cursor-pointer w-[530px] h-[250px] flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg relative group overflow-hidden border border-dotted border-green-500`}>
                <input
                  type="file"
                  name="image"
                  id="imageColor"
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
            </Stack>
            <Stack direction="column" spacing={1} mb={1} sx={{ width: "100%" }}>
              <Label>Size:</Label>
              <Autocomplete
                fullWidth
                options={
                  data
                    ? data?.map((item) => {
                      return {
                        id: item._id,
                        name: item.name,
                      };
                    })
                    : []
                }
                autoHighlight
                multiple
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={formValues.sizes}
                onChange={(event, newInputValue) => {
                  setFormValues({
                    ...formValues,
                    sizes: newInputValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chọn size"
                    // control={control}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",

                    }}
                  />

                )}
              />
            </Stack>
            {formValues.sizes.length > 0 &&
              formValues.sizes.map((item, index) => (
                <>
                  <Stack
                    direction="row"
                    spacing={2}
                    mb={1}
                    alignItems="center"
                    key={index}>
                    <LabelStatus
                      variant="soft"
                      color="success"
                      sx={{ fontSize: "15px" }}>
                      {item.name}
                    </LabelStatus>
                    <InputAdmin
                      type="number"
                      control={control}
                      name={`quantity_${item.id}`}
                      placeholder="Nhập số lượng sản phẩm"
                    />
                    {/* {errors && <p className="text-red-600">{errors.number?.message}</p>} */}
                  </Stack>
                  {/* {errors?.sizes?.[index]?.[`quantity_${item.id}`] && (
                    <p className="text-red-600">
                      {errors.sizes[index][`quantity_${item.id}`].message}
                    </p>
                  )} */}
                </>
              ))}

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

export default ColorCreateDialog;
