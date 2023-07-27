import { Card, Tab, Tabs } from "@mui/material";
import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import WrapperTable from "../../../components/table/WrapperTable";
import Layout from "../../../layouts/Layout";
import ProductCreateDialog from "./ProductCreateDialog";
import ProductFilter from "./ProductFilter";
import * as actions from "./api/productAction";
import { isNull } from "lodash";

const TABS = [
  { value: "all", label: "Tất cả" },
  { value: "hoat_dong", label: "Đang hoạt động" },
  { value: "dung_hoat_dong", label: "Ngừng hoạt động" },
  //{ value: "sap_het_hang", label: "Sắp hết hàng" },
];
const ProductListPage = () => {
  const defaultFilter = {
    name: "",
    status: "all",
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
  const [filterStatus, setFilterStatus] = React.useState("all");
  const { currentState, authState } = useSelector(
    (state) => ({ currentState: state.product, authState: state.auth }),
    shallowEqual
  );
  const {
    data,
    product,
    productId,
    productForEdit,
    listLoading,
    totalElements,
  } = currentState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      actions.fetchProducts({
        params: { ...filter, current_page: page + 1, per_page: rowsPerPage },
      })
    );
  }, [dispatch, product, productForEdit, productId, filter, page, rowsPerPage]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "name", label: "Tên sản phẩm" },
    { id: "imageProduct", label: "Ảnh" },
    { id: "price", label: "Giá sản phẩm" },
    { id: "price_discount", label: "Giảm giá" },
    { id: "colors", label: "Màu sản phẩm" },
    { id: "soluong_sanpham", label: "Số lượng sản phẩm" },
    // { id: "soluong_daban", label: "Đã bán" },
    { id: "createdAt", label: "Ngày tạo" },
    { id: "status", label: "Trạng thái" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "name", type: string },
    { label: "imageProduct", type: string },
    { label: "price", type: string },
    { label: "price_discount", type: string },
    { label: "colors", type: string },
    { label: "soluong_sanpham", type: string },
    // { label: "soluong_daban", type: string },
    { label: "createdAt", type: string },
    { label: "status", type: string },
  ];
  const { user } = authState;
  useEffect(() => {
    if (!isNull(data)) {
      setNewData(data);
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
      dispatch(actions.deleteProduct(selectCateId));
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
        <ProductFilter
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
        <WrapperTable
          component={"Product"}
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
      </Card>

      <ProductCreateDialog
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

export default ProductListPage;
