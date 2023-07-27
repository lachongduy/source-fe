import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
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
import { createSize, updateSize } from "./api/sizeAction";
import Label from "../../../components/label/Label";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SizeCreateDialog = (props) => {
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
    setValue("name", "");
  };
  const dispatch = useDispatch();
  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên size"),

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
  const handleSumitSize = async (values) => {
    if (!isValid) return;
    if (props.isEdit) {
      const cloneValueUpdate = {
        ...values,
        id: props.data._id,
      };
      dispatch(updateSize(cloneValueUpdate));
    } else {
      dispatch(createSize(values));
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
              {props.isEdit ? "Cập nhật size" : "Thêm size mới"}
            </Typography>
            <IconButton title="Đóng" onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <form onSubmit={handleSubmit(handleSumitSize)}>
            <Stack direction="column" spacing={1} mb={3}>
              <Label>Tên size:</Label>
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

export default SizeCreateDialog;
