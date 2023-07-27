import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import {
  Slide,
  DialogActions,
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
import * as actions from "./api/danhMucAction";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Label from "../../../components/label/Label";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DanhMucCreateDialog = (props) => {
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
    setValue("name", "");
  };
  const dispatch = useDispatch();
  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên danh mục"),
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
  const handleSumitCategory = async (values) => {
    if (!isValid) return;
    if (props.isEdit) {
      const cloneValueUpdate = {
        ...values,
        id: props.data._id,
      };

      dispatch(actions.updateCatetory(cloneValueUpdate));
    } else {
      dispatch(actions.createCategory(values));
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
              {props.isEdit ? "Cập nhật danh mục" : "Thêm danh mục mới"}
            </Typography>
            <IconButton title="Đóng" onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <form onSubmit={handleSubmit(handleSumitCategory)}>
            <Stack direction="column" spacing={1} mb={3}>
              <Label>Tên danh mục:</Label>
              <InputAdmin type="text" control={control} name="name" />
              {errors && <p className="text-red-600">{errors.name?.message}</p>}
            </Stack>
            <DialogActions>
              <Button
                variant="outlined"
                color="error"
                onClick={handleCloseDialog}
                startIcon={<HighlightOffIcon />}
                type="button">
                Hủy
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                startIcon={<SaveAltIcon />}>
                {props.isEdit ? "Cập nhật" : "Thêm"}
              </Button>
            </DialogActions>
          </form>

        </Box>
      </Drawer>
    </>
  );
};

export default DanhMucCreateDialog;
