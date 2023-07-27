
import {
  Box,

  Stack,
} from "@mui/material";
import React, { useState } from "react";
import ActionButton from "../../../components/action/ActionButton";

// const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
//   width: 240,
//   transition: theme.transitions.create(["box-shadow", "width"], {
//     easing: theme.transitions.easing.easeInOut,
//     duration: theme.transitions.duration.shorter,
//   }),
//   "&.Mui-focused": {
//     width: 320,
//     boxShadow: theme.customShadows.z8,
//   },
//   "& fieldset": {
//     borderWidth: `1px !important`,
//     borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
//   },
// }));
const BannerFilter = (props) => {
  const [values, setValues] = useState({ name: "" });
  const openCreateDialog = () => {
    props.openCreate();
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };
  // const handleFilter = () => {
  //   props.onSearch(values);
  // };
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <h1 className="font-semibold text-2xl">Quản lý ảnh bìa</h1>
        <ActionButton
          disabled={!props.listPermisstion?.includes("CREATE_ANH_BIA")}
          actionCreateDialog={openCreateDialog}
          title="Thêm ảnh bìa"
        />
      </Stack>
      {/* <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={3}
        mt={2}>
        <StyledSearch
          value={values.name}
          name="name"
          onChange={handleChange}
          placeholder="Tìm kiếm banner..."
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
      </Stack> */}

    </Box>
  );
};

export default BannerFilter;
