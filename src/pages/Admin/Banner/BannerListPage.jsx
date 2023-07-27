import { Box, Card } from "@mui/material";
import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import WrapperTable from "../../../components/table/WrapperTable";
import Layout from "../../../layouts/Layout";


import BannerCreateDialog from "./BannerCreateDialog";
import BannerFilter from "./BannerFilter";
import * as actions from "./api/bannerAction";
import { isNull } from "lodash";
const BannerListPage = () => {
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
    (state) => ({ currentState: state.banners, authState: state.auth }),
    shallowEqual
  );
  const {
    data,
    banner,
    bannerId,
    bannerForEdit,
    listLoading,
    totalElements,
  } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchBanners({
        params: { ...filter, current_page: page + 1, per_page: rowsPerPage },
      })
    );
  }, [dispatch, banner, bannerForEdit, bannerId, filter, page, rowsPerPage]);

  const { user } = authState;

  const headRows = [
    { id: "stt", label: "STT" },
    { id: "imageBanner", label: "Hình ảnh" },
    { id: "doUuTien", label: "Thứ tự ưu tiên" },
    { id: "status", label: "Trạng thái" },
    { id: "createdAt", label: "Ngày tạo" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "imageBanner", type: string },
    { label: "doUuTien", type: string },
    { label: "status", type: string },
    { label: "createdAt", type: string },
  ];

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
      dispatch(actions.deleteBanner(selectCateId));
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
        <BannerFilter
          openCreate={openCreateDialog}
          onSearch={handleSearch}
          listPermisstion={user?.permissions}

        />
        <Box mt={4}>
          <WrapperTable
            component={"Banners"}
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

      <BannerCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectCate}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa ảnh bìa này không"}></ConfirmDialog>
    </Layout>
  );
};

export default BannerListPage;
