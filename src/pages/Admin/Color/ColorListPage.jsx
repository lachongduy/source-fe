import { Box, Card, Tab, Tabs } from "@mui/material";
import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import WrapperTable from "../../../components/table/WrapperTable";
import Layout from "../../../layouts/Layout";
import ColorCreateDialog from "./ColorCreateDialog";
import ColorFilter from "./ColorFilter";
import * as actions from "./api/colorAction";


const TABS = [
  { value: "all", label: "Tất cả" },
  { value: "hoat_dong", label: "Đang hoạt động" },
  { value: "dung_hoat_dong", label: "Ngừng hoạt động" },
  { value: "sap_het_hang", label: "Sắp hết hàng" },
];
const ColorListPage = () => {
  const defaultFilter = {
    name: "",
    status: "all"
  };
  //const [newData, setNewData] = React.useState([]);
  const [filter, setFilter] = React.useState(defaultFilter);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectCateId, setSelectCateId] = React.useState(undefined);
  const [selectCate, setSelectCate] = React.useState(undefined);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterStatus, setFilterStatus] = React.useState("all");
  const { currentState, authState } = useSelector(
    (state) => ({ currentState: state.colors, authState: state.auth }),
    shallowEqual
  );
  const {
    data,
    color,
    colorId,
    colorForEdit,
    listLoading,
    totalElements,
  } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchColors({
        params: { ...filter, current_page: page + 1, per_page: rowsPerPage },
      })
    );
  }, [dispatch, color, colorForEdit, colorId, filter, page, rowsPerPage]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "name", label: "Tên màu" },
    { id: "sizes", label: "Sizes" },
    { id: "imageColor", label: "Hình ảnh" },
    { id: "status", label: "Trạng thái" },
    { id: "createdAt", label: "Ngày tạo" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "name", type: string },
    { label: "sizes", type: string },
    { label: "imageColor", type: string },
    { label: "status", type: string },
    { label: "createdAt", type: string },
  ];
  const { user } = authState;
  // useEffect(() => {
  //   if (!isNull(data)) {
  //     const tamp = data.filter(item => item.status === true)
  //     setNewData(tamp);
  //   }
  // }, [data])

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
      dispatch(actions.deleteColor(selectCateId));
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
  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
    setFilter({
      ...filter,
      status: newValue,
    });
  };
  return (
    <Layout>
      <Card sx={{ padding: "20px" }}>
        <ColorFilter
          openCreate={openCreateDialog}
          onSearch={handleSearch}
          listPermisstion={user?.permissions}
        />
        <Card className="rounded-lg mt-4">
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            className="bg-yellow-100"
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
              />
            ))}
          </Tabs>
        </Card>
        <Box mt={4}>
          <WrapperTable
            component={"Colors"}
            displayTableTitle={headRows}
            displayRowData={mapKey}
            data={data}
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

      <ColorCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectCate}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa màu này"}></ConfirmDialog>
    </Layout>
  );
};

export default ColorListPage;
