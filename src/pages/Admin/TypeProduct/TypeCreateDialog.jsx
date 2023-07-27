import { yupResolver } from "@hookform/resolvers/yup";
import {
  Slide,
  Button,
  Drawer,
  Box,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import InputAdmin from "../../../components/input/InputAdmin";
import CloseIcon from "@mui/icons-material/Close";
import Label from "../../../components/label/Label";
import * as actions from "./api/typeAction";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const TypeProductCreateDialog = (props) => {
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
    setValue("name", "");
  };
  const dispatch = useDispatch();
  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên loại"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  const handleSumitTypeProduct = async (values) => {
    if (!isValid) return;
    if (props.isEdit) {
      const cloneValueUpdate = {
        ...values,
        id: props.data._id,
      };
      dispatch(actions.updateTypeProduct(cloneValueUpdate));
    } else {
      dispatch(actions.createTypeProduct(values));
    }
    props.closeCreateDialog(false);
  };
  useEffect(() => {
    if (props.isEdit) {
      setValue("name", props.data.name);
    } else if (!props.isEdit) {
      setValue("name", "");
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
        <Box sx={{ paddingX: "24px", paddingY: "24px", width: "500px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}>
            <Typography variant="h5">
              {props.isEdit ? "Cập nhật loại sản phẩm" : "Thêm loại sản phẩm mới"}
            </Typography>
            <IconButton title="Đóng" onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <form onSubmit={handleSubmit(handleSumitTypeProduct)}>
            <Stack direction="column" spacing={1} mb={3}>
              <Label>Tên loại sản phẩm:</Label>
              <InputAdmin
                type="text"
                control={control}
                name="name" />
              {errors && <p className="text-red-600">{errors.name?.message}</p>}
            </Stack>
            <div className="flex items-center justify-end gap-x-3 mt-5 ">
              <Button
                variant="outlined"
                color="error"
                onClick={handleCloseDialog}
                type="button">
                Hủy
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary">
                {props.isEdit ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </form>
        </Box>
      </Drawer>
    </>
  );
};

export default TypeProductCreateDialog;
