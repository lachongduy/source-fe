import { Box, Card } from "@mui/material";
import { isNull } from "lodash";
import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import WrapperTable from "../../../components/table/WrapperTable";
import Layout from "../../../layouts/Layout";
import DanhMucCreateDialog from "./DanhMucCreateDialog";
import DanhMucFilter from "./DanhMucFilter";
import * as actions from "./api/danhMucAction";
const DanhMucListPage = () => {
  const defaultFilter = {
    name: "",
  };
  const [filter, setFilter] = React.useState(defaultFilter);
  const [newData, setNewData] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectCateId, setSelectCateId] = React.useState(undefined);
  const [selectCate, setSelectCate] = React.useState(undefined);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { currentState, authState } = useSelector(
    (state) => ({ currentState: state.categorys, authState: state.auth }),
    shallowEqual
  );
  const {
    data,
    danhmuc,
    danhmucId,
    danhmucForEdit,
    listLoading,
    totalElements,
  } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchCategories({
        params: { ...filter, current_page: page + 1, per_page: rowsPerPage },
      })
    );
  }, [dispatch, danhmuc, danhmucForEdit, danhmucId, filter, page, rowsPerPage]);
  const { user } = authState;
  console.log(user);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "name", label: "Tên danh mục" },
    { id: "status", label: "Trạng thái" },
    { id: "createdAt", label: "Ngày tạo" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "name", type: string },
    { label: "status", type: string },
    { label: "createdAt", type: string },
  ];
  useEffect(() => {
    if (!isNull(data)) {
      setNewData(data.filter((item) => item.status === true));
    }
  }, [data]);

  function openCreateDialog() {
    setIsEdit(false);
    setOpen(true);
  }
  function closeCreateDialog(status) {
    if (status === false) {
      setOpen(status);
    }
  }
  function handleDelete(cateId) {
    setOpenDelete(true);
    setSelectCateId(cateId);
  }

  function handleEdit(item) {
    setSelectCate(item);
    setIsEdit(true);
    setOpen(true);
  }

  function closeDeleteDialog(status) {
    if (status) {
      dispatch(actions.deleteCategory(selectCateId));
    }
    setOpenDelete(false);
  }
  function handleSearch(filter) {
    setFilter(filter);
  }
  function handleChangePage(value) {
    setPage(value);
  }
  function handleChangeRowsPerPage(value) {
    setRowsPerPage(value);
  }
  return (
    <Layout>
      <Card sx={{ padding: "20px" }}>
        <DanhMucFilter
          openCreate={openCreateDialog}
          onSearch={handleSearch}
          listPermisstion={user?.permissions}
        />
        <Box mt={4}>
          <WrapperTable
            component={"Category"}
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

      <DanhMucCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectCate}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa danh mục này"}></ConfirmDialog>
    </Layout>
  );
};

export default DanhMucListPage;
