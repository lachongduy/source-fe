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
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Checkbox,

} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import InputAdmin from "../../../components/input/InputAdmin";
import * as actions from "./api/userAction";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Label from "../../../components/label/Label";
import { InputPasswordToggle } from "../../../components/input";
import { RiUserSmileLine } from "react-icons/ri";
import { permissions } from "../../../utils/wrapperUtils";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const UserCreateDialog = (props) => {
  const handleCloseDialog = () => {
    resetValue();
    props.closeCreateDialog(false);
  };
  const dispatch = useDispatch();
  const schemaValidation = Yup.object().shape({
    fullName: Yup.string().required("Vui lòng nhập tên đầy đủ"),
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Vui lòng nhập địa chỉ email hợp lệ"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu của bạn phải có ít nhất 8 ký tự trở lên"),
  });
  const [role, setRole] = useState("Personnel");
  const [checked, setChecked] = React.useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });

  const handleSumitCreateUser = async (values) => {
    if (!isValid) return;
    if (props.isEdit) {
      const cloneValueUpdate = {
        email: values.email,
        fullName: values.fullName,
        id: props.data._id,
        role,
        permissions: checked,
      };
      dispatch(actions.updateAccountNotUser(cloneValueUpdate));
    } else {
      const transfromData = {
        ...values,
        role,
        permissions: checked,
      };
      dispatch(actions.createUser(transfromData));
    }
    props.closeCreateDialog(false);
  };
  const resetValue = () => {
    setValue("email", "");
    setValue("password", "");
    setValue("fullName", "");
    setChecked([]);
  };
  useEffect(() => {
    if (props.isEdit) {
      setValue("fullName", props.data.fullName);
      setValue("email", props.data.email);
      setValue("password", props.data.password);
      setRole(props.data.role);
      setChecked(props.data.permissions);
    } else if (!props.isEdit) {
      resetValue();
    }
  }, [props.data, props.isEdit, setValue]);
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const allKeys = permissions.reduce((acc, module) => {
    return acc.concat(module.permission.map((item) => item.key));
  }, []);
  const handleCheckedAll = () => {
    if (
      checked.length ===
      permissions.length * permissions[0].permission.length
    ) {
      // Nếu tất cả các mục đã được chọn, xóa tất cả
      setChecked([]);
    } else {
      // Nếu không, chọn tất cả
      const allKeys = permissions.reduce((acc, module) => {
        return acc.concat(module.permission.map((item) => item.key));
      }, []);
      setChecked(allKeys);
    }
  };

  return (
    <>
      <Drawer
        open={props.open}
        TransitionComponent={Transition}
        anchor="right"
        sx={{ width: "550px" }}
        disableEscapeKeyDown
        aria-describedby="alert-dialog-slide-description">
        <Box sx={{ paddingX: "24px", paddingY: "24px", width: "750px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}>
            <Typography variant="h5">
              {props.isEdit ? "Cập nhật tài khoản" : "Thêm tài khoản mới"}
            </Typography>
            <IconButton title="Đóng" onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <form onSubmit={handleSubmit(handleSumitCreateUser)}>
            <Stack direction="column" spacing={1} mb={3}>
              <Label>Tên đầy đủ:</Label>
              <InputAdmin type="text" control={control} name="fullName" />
              {errors && (
                <p className="text-red-600">{errors.fullName?.message}</p>
              )}
            </Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <Label>Email:</Label>
              <InputAdmin type="text" control={control} name="email" />
              {errors && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <Label>Mật khẩu:</Label>
              <InputPasswordToggle
                placeholder="Mật khẩu"
                control={control}
                name="password"
                disabled={props.isEdit}
                type="password">
                <RiUserSmileLine />
              </InputPasswordToggle>
              {errors && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
            </Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <Label>Chức vụ:</Label>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={role}
                onChange={handleChange}
                row>
                <FormControlLabel
                  value="Personnel"
                  control={<Radio />}
                  label="Nhân viên"
                />
                <FormControlLabel
                  value="Manager"
                  control={<Radio />}
                  label="Quản lý"
                />
              </RadioGroup>
            </Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <Label>Phân quyền:</Label>
                <FormControlLabel
                  label="Chọn tất cả"
                  control={
                    <Checkbox
                      checked={checked.length === allKeys.length}
                      indeterminate={
                        checked.length > 0 && checked.length < allKeys.length
                      }
                      onChange={handleCheckedAll}
                    />
                  }
                />
              </Stack>

              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {permissions.map((module) => (
                  <ListItem
                    key={module.module}
                    sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemText
                      primary={module.module}
                      sx={{ flexBasis: "5%" }}
                    />
                    {module.permission.map((item) => (
                      <ListItemButton
                        key={item.key}
                        sx={{ flex: 1 }}
                        role={undefined}
                        onClick={handleToggle(item.key)}
                        dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(item.key) !== -1}
                            tabIndex={-1}
                          />
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItemButton>
                    ))}
                  </ListItem>
                ))}
              </List>
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

export default UserCreateDialog;
