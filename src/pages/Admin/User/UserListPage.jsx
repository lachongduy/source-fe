import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Layout from "../../../layouts/Layout";
import WrapperTable from "../../../components/table/WrapperTable";
import * as actions from "./api/userAction";
import { string } from "prop-types";
import { Box, Card } from "@mui/material";
import UserFilterPage from "./UserFilterPage";
import UserCreateDialog from "./UserCreateDialog";

const UserListPage = () => {
  const defaultFilter = {
    name: "",
  };
  const [filterName, setFilterName] = React.useState(defaultFilter);
  const [newData, setNewData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectUser, setSelectUser] = React.useState(undefined);
  const { currentState, authState } = useSelector(
    (state) => ({ currentState: state.user, authState: state.auth }),
    shallowEqual
  );
  const { data, user, userId, listLoading, totalElements, accountNotUser } =
    currentState;
  const { user: currentUser } = authState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchAllUser({
        params: {
          ...filterName,
          current_page: page + 1,
          per_page: rowsPerPage,
        },
      })
    );
  }, [dispatch, user, userId, filterName, page, rowsPerPage, accountNotUser]);

  useEffect(() => {
    setNewData(data?.filter((user) => user.role !== "Admin"));
  }, [data]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "fullName", label: "Tên người dùng" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Số điện thoại" },
    { id: "address", label: "Địa chỉ" },
    { id: "gender", label: "Giới tính" },
    { id: "role", label: "Chức vụ" },
    { id: "banned", label: "Trạng thái" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "fullName", type: string },
    { label: "email", type: string },
    { label: "phone", type: string },
    { label: "address", type: string },
    { label: "gender", type: string },
    { label: "role", type: string },
    { label: "banned", type: string },
  ];
  function openCreateDialog() {
    setIsEdit(false);
    setOpen(true);
  }
  function closeCreateDialog(status) {
    if (status === false) {
      setOpen(status);
    }
  }
  function handleChangePage(value) {
    setPage(value);
  }
  function handleChangeRowsPerPage(value) {
    setRowsPerPage(value);
  }
  function handleSearch(filter) {
    setFilterName(filter);
  }
  function handleDelete(cateId) {
  }

  function handleEdit(item) {
    setSelectUser(item);
    setIsEdit(true);
    setOpen(true);
  }
  return (
    <Layout>
      <Card sx={{ padding: "20px" }}>
        <UserFilterPage
          openCreate={openCreateDialog}
          onSearch={handleSearch}
          isAdmin={currentUser?.role === "Admin"}></UserFilterPage>
        <Box mt={4}>
          <WrapperTable
            component={"User"}
            displayTableTitle={headRows}
            displayRowData={mapKey}
            data={newData}
            onDeleteRow={handleDelete}
            onEditRow={handleEdit}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            listLoading={listLoading}
            total={totalElements}
          />
        </Box>
      </Card>

      <UserCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectUser}
        isEdit={isEdit}
      />
    </Layout>
  );
};

export default UserListPage;
