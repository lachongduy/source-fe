import AddTaskIcon from "@mui/icons-material/AddTask";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Card,
  Collapse,
  IconButton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import Label from "../../../components/labelStatus/Label";
import Layout from "../../../layouts/Layout";
import { convertToVND } from "../../../utils/wrapperUtils";
import OrderFilter from "./OrderFilter";
import OrderCreateDialog from "./OrderCreateDialog";
import * as actions from "./api/oderAction";
const TABS = [
  { value: "all", label: "Tất cả", color: "text-blue-500" },
  { value: "0", label: "Đang chờ duyệt", color: "text-black" },
  { value: "1", label: "Đã được duyệt", color: "text-green-500" },
  { value: "2", label: "Đã hủy", color: "text-red-600" },
  { value: "3", label: "Không được duyệt", color: "text-orange-600" },
];
const OrderListPage = () => {
  const defaultFilter = {
    name: "",
  };
  const [filter, setFilter] = React.useState(defaultFilter);
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDuyetDonHang, setOpenDuyetDonHang] = React.useState(false);
  const [openKhongDuyetDonHang, setOpenKhongDuyetDonHang] =
    React.useState(false);
  const [selectOrderId, setSelectOrderId] = React.useState(undefined);
  const [open, setOpen] = useState(false);
  const { currentState, authState } = useSelector(
    (state) => ({ currentState: state.order, authState: state.auth }),
    shallowEqual
  );
  const {
    data,
    order,
    orderId,
    totalElements,
    orderForEdit,
    orderForAdminEdit,
  } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchOrders({
        params: {
          ...filter,
          orderStatus: filterStatus,
          current_page: page + 1,
          per_page: rowsPerPage,
        },
      })
    );
  }, [
    dispatch,
    order,
    orderId,
    filter,
    page,
    rowsPerPage,
    orderForEdit,
    orderForAdminEdit,
    filterStatus,
  ]);
  const { user } = authState;
  function handleKhongDuyet(orderId) {
    setOpenKhongDuyetDonHang(true);
    setSelectOrderId(orderId);
  }
  function closeKhongDuyetDonHang(status) {
    if (status) {
      dispatch(actions.updateOrderCancelOfAdmin(selectOrderId));
    }
    setPage(0);
    setOpenKhongDuyetDonHang(false);
  }

  function handleDuyet(orderId) {
    setOpenDuyetDonHang(true);
    setSelectOrderId(orderId);
  }
  function closeDuyetDonHang(status) {
    if (status) {
      dispatch(actions.updateOrder(selectOrderId));
    }
    setPage(0);
    setOpenDuyetDonHang(false);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }
  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };
  function handleSearch(filter) {
    setFilter(filter);
  }
  function openCreateDialog() {
    setOpen(true);
  }
  function closeCreateDialog(status) {
    if (status === false) {
      setOpen(status);
    }
  }

  const headRows = [
    { id: "stt", label: "STT" },
    { id: "order_id", label: "Mã đơn hàng" },
    { id: "fullName", label: "Tên người nhận" },
    { id: "phone", label: "Số điện thoại" },
    { id: "email", label: "Email" },
    { id: "address", label: "Địa chỉ" },
    { id: "total_product", label: "Số lượng" },
    { id: "total_price", label: "Tổng tiền" },
    { id: "createdAt", label: "Thời gian đặt hàng" },
    { id: "updatedAt", label: "Thời gian duyệt/không duyệt" },
    { id: "orderStatus", label: "Tình trạng đơn hàng" },
    { id: "hinhThucThanhToan", label: "Hình thức thanh toán" },
    { id: "lyDoHuy", label: "Lý do hủy" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "order_id", type: string },
    { label: "fullName", type: string },
    { label: "phone", type: string },
    { label: "email", type: string },
    { label: "address", type: string },
    { label: "total_product", type: string },
    { label: "total_price", type: string },
    { label: "createdAt", type: string },
    { label: "updatedAt", type: string },
    { label: "orderStatus", type: string },
    { label: "hinhThucThanhToan", type: string },
    { label: "lyDoHuy", type: string },
  ];
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell sx={{ minWidth: "70px" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="left">{props.index + 1}</TableCell>
          {mapKey.map((item, idx) => {
            if (item.label === "createdAt" || item.label === "updatedAt") {
              return (
                <TableCell key={idx} sx={{ minWidth: "160px" }}>
                  {moment(row[item.label]).locale("vi").format("l")}
                </TableCell>
              );
            }
            if (item.label === "total_price") {
              return (
                <TableCell sx={{ minWidth: "200px" }} key={idx}>
                  {convertToVND(row[item.label])}
                </TableCell>
              );
            }
            if (item.label === "hinhThucThanhToan") {
              if (row.hinhThucThanhToan === "Tiền mặt") {
                return (
                  <TableCell sx={{ minWidth: "200px" }} key={idx}>
                    <Label variant="soft" color="secondary">
                      {row[item.label]}
                    </Label>
                  </TableCell>
                );
              } else {
                return (
                  <TableCell sx={{ minWidth: "200px" }} key={idx}>
                    <Label variant="soft" color="warning">
                      {row[item.label]}
                    </Label>
                  </TableCell>
                );
              }
            }
            if (item.label === "orderStatus") {
              if (row.orderStatus === 0) {
                return (
                  <TableCell sx={{ minWidth: "200px" }} key={idx}>
                    <Label variant="soft">Đang chờ duyệt</Label>
                  </TableCell>
                );
              } else if (row.orderStatus === 2) {
                return (
                  <TableCell sx={{ minWidth: "200px" }} key={idx}>
                    <Label variant="soft" color="error">
                      Đã hủy
                    </Label>
                  </TableCell>
                );
              } else if (row.orderStatus === 3) {
                return (
                  <TableCell sx={{ minWidth: "200px" }} key={idx}>
                    <Label variant="soft" className="text-orange-600">
                      Không được duyệt
                    </Label>
                  </TableCell>
                );
              } else {
                return (
                  <TableCell sx={{ minWidth: "200px" }} key={idx}>
                    <Label variant="soft" color="success">
                      Đã được duyệt
                    </Label>
                  </TableCell>
                );
              }
            }
            return (
              <TableCell align="left" sx={{ minWidth: "150px" }} key={idx}>
                {row[item.label]}
              </TableCell>
            );
          })}
          <TableCell align="left" sx={{ minWidth: "180px" }}>
            {row.orderStatus === 0 && (
              <Stack direction="row" spacing={1}>

                <Tooltip title="Duyệt đơn hàng">
                  <IconButton
                    disabled={
                      !user?.permissions?.includes("DUYET_DON_HANG")
                    }
                    onClick={() => handleDuyet(row._id)}>
                    <AddTaskIcon className="text-blue-500"></AddTaskIcon>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Không duyệt đơn hàng">
                  <IconButton
                    disabled={
                      !user?.permissions?.includes("KHONG_DUYET_DON_HANG")
                    }
                    onClick={() => handleKhongDuyet(row._id)}>
                    <ErrorOutlineIcon className="text-orange-600"></ErrorOutlineIcon>
                  </IconButton>
                </Tooltip>

              </Stack>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Chi tiết sản phẩm đã đặt
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Hình ảnh</TableCell>
                      <TableCell>Tên sản phảm</TableCell>
                      <TableCell align="left">Màu sắc</TableCell>
                      <TableCell align="left">Size</TableCell>
                      <TableCell align="left">Số lượng</TableCell>
                      <TableCell align="left">Giá</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.cart?.map((historyRow) => (
                      <TableRow key={historyRow._id}>
                        <TableCell component="th" scope="row">
                          <img
                            src={historyRow.imageProduct}
                            alt="anh sp"
                            className="w-[80px] h-[80px]"
                          />
                        </TableCell>
                        <TableCell align="left">{historyRow.name}</TableCell>
                        <TableCell align="left">
                          {historyRow.colors.name}
                        </TableCell>
                        <TableCell align="left">
                          <Label color="primary">
                            {historyRow?.sizes?.size?.name}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          {historyRow.cartQuantity}
                        </TableCell>
                        <TableCell align="left">
                          {historyRow.price_discount
                            ? convertToVND(
                              historyRow.price_discount *
                              historyRow.cartQuantity
                            )
                            : convertToVND(
                              historyRow.price * historyRow.cartQuantity
                            )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    <Layout>

      <OrderFilter
        openCreate={openCreateDialog}
        onSearch={handleSearch}
        listPermisstion={user?.permissions}
        filterExportOrder={{ ...filter, orderStatus: filterStatus }}
      />
      <Card className="mx-5 mt-5">
        <Tabs
          value={filterStatus}
          onChange={handleFilterStatus}
          className="bg-yellow-100">
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              className={`${tab.color}`}
            />
          ))}
        </Tabs>
        <TableContainer sx={{ maxHeight: 650 }} className="overflow-scroll">
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                {headRows?.map((item) => (
                  <TableCell key={item.id}>{item.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <Row key={row._id} row={row} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={totalElements || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Số dòng mỗi trang"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <OrderCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}

      // isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDuyetDonHang}
        closeDialog={closeDuyetDonHang}
        description={"Bạn có chắc chắn duyệt đơn hàng này"}></ConfirmDialog>
      <ConfirmDialog
        openDialog={openKhongDuyetDonHang}
        closeDialog={closeKhongDuyetDonHang}
        description={
          "Bạn có chắc chắn không duyệt đơn hàng này"
        }></ConfirmDialog>
    </Layout>
  );
};
export default OrderListPage;
