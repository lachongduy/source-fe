
import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React, { useState } from "react";
import ActionButton from "../../../components/action/ActionButton";
import SearchIcon from "@mui/icons-material/Search";
const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));
const ImageFilter = (props) => {
  const [values, setValues] = useState({ name: "" });
  const openCreateDialog = () => {
    props.openCreate();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleFilter = () => {
    props.onSearch(values);
  };
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <h1 className="font-semibold text-2xl">Hình ảnh sản phẩm</h1>
        <ActionButton
          disabled={!props.listPermisstion?.includes("CREATE_ANH")}
          actionCreateDialog={openCreateDialog}
          title="Thêm ảnh"
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={3}
        mt={2}>
        <StyledSearch
          value={values.name}
          name="name"
          onChange={handleChange}
          placeholder="Tìm kiếm tên ảnh..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
        <Button type="button" variant="contained" onClick={handleFilter}>
          Lọc
        </Button>
      </Stack>
    </Box>
  );
};

export default ImageFilter;
