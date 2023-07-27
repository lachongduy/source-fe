import { Box, Card } from "@mui/material";
import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import WrapperTable from "../../../components/table/WrapperTable";
import Layout from "../../../layouts/Layout";
import ImageCreateDialog from "./ImageCreateDialog";
import ImageFilter from "./ImageFilter";
import * as actions from "./api/imageAction";
import { isNull } from "lodash";
const ImageListPage = () => {
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
    (state) => ({ currentState: state.image, authState: state.auth }),
    shallowEqual
  );
  const {
    data,
    image,
    imageId,
    listLoading,
    totalElements, imageForEdit,
  } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchImages({
        params: { ...filter, current_page: page + 1, per_page: rowsPerPage },
      })
    );
  }, [dispatch, image, imageId, filter, page, rowsPerPage, imageForEdit]);



  const headRows = [
    { id: "stt", label: "STT" },
    { id: "name", label: "Tên ảnh" },
    { id: "image", label: "Hình ảnh" },
    { id: "status", label: "Trạng thái" },
    { id: "createdAt", label: "Ngày tạo" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "name", type: string },
    { label: "image", type: string },
    { label: "status", type: string },
    { label: "createdAt", type: string },
  ];
  const { user } = authState;
  useEffect(() => {
    if (!isNull(data)) {
      const tamp = data.filter(item => item.status === true)
      setNewData(tamp);
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
      dispatch(actions.deleteImage(selectCateId));
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
        <ImageFilter
          openCreate={openCreateDialog}
          onSearch={handleSearch}
          listPermisstion={user?.permissions}
        />
        <Box mt={4}>
          <WrapperTable
            component={"Image"}
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

      <ImageCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectCate}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa ảnh này"}></ConfirmDialog>
    </Layout>
  );
};

export default ImageListPage;
