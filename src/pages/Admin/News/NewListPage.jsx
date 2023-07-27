import { Box, Card } from "@mui/material";
import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import WrapperTable from "../../../components/table/WrapperTable";
import Layout from "../../../layouts/Layout";
import NewCreateDialog from "./NewCreateDialog";
import NewFilter from "./NewFilter";
import * as actions from "./api/newAction";
import { isNull } from "lodash";
const NewListPage = () => {
  const defaultFilter = {
    name: "",
  };
  const [newData, setNewData] = React.useState([]);
  const [filter, setFilter] = React.useState(defaultFilter);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectCateId, setSelectCateId] = React.useState(undefined);
  const [selectCate, setSelectCate] = React.useState(undefined);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { currentState, authState } = useSelector(
    (state) => ({ currentState: state.new, authState: state.auth }),
    shallowEqual
  );
  const {
    data,
    news,
    newId,
    newForEdit,
    listLoading,
    totalElements,
  } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchNews({
        params: { ...filter, current_page: page + 1, per_page: rowsPerPage },
      })
    );
  }, [dispatch, news, newForEdit, newId, filter, page, rowsPerPage]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "title", label: "Tiêu đề" },
    { id: "imageNew", label: "Ảnh" },
    { id: "slug", label: "Đường dẫn" },
    { id: "createdAt", label: "Ngày tạo" },
    { id: "status", label: "Trạng thái" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "title", type: string },
    { label: "imageNew", type: string },
    { label: "slug", type: string },
    { label: "createdAt", type: string },
    { label: "status", type: string },
  ];
  const { user } = authState;
  useEffect(() => {
    if (!isNull(data)) {
      setNewData(data.filter(item => item.status === true))
    }
  }, [data])

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
      dispatch(actions.deleteNew(selectCateId));
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
        <NewFilter
          openCreate={openCreateDialog}
          onSearch={handleSearch}
          listPermisstion={user?.permissions}
        />
        <Box mt={4}>
          <WrapperTable
            component={"New"}
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

      <NewCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectCate}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa bài viết này"}></ConfirmDialog>
    </Layout>
  );
};

export default NewListPage;
