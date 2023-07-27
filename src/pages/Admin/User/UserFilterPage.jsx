import React, { useState } from "react";
import { StyledSearch } from "../../../components/search/StyleSearch";
import { Box, Button, InputAdornment, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ActionButton from "../../../components/action/ActionButton";

const UserFilterPage = (props) => {
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
        <h1 className="font-semibold text-2xl">Quản lý người dùng</h1>
        <ActionButton
          disabled={!props.isAdmin}
          actionCreateDialog={openCreateDialog}
          title="Thêm tài khoản"
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
          placeholder="Tìm kiếm @email user..."
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

export default UserFilterPage;
