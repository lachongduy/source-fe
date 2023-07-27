import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Card, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Label from "../../../components/labelStatus/Label";
import LayoutCustomer from "../../../layouts/LayoutCustomer";
import { convertToVND } from "../../../utils/wrapperUtils";
import * as actions from "../../Admin/Order/api/oderAction";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import ConfirmDialog from '../../../components/dialog/ConfirmDialog';
import OrderHistoryFilter from './OrderHistoryFilter';
import ConfirmLyDoHuy from '../../../components/dialog/ConfirmLyDoHuy';

const OrderHistory = () => {
    const { currentState, authState } = useSelector(
        (state) => ({ currentState: state.order, authState: state.auth }),
        shallowEqual
    );
    const { authToken } = authState
    const defaultValues = {
        user_id: authToken?.user?._id,
        order_id: ""
    }

    const [filter, setFilter] = React.useState(defaultValues);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openHuyDonHang, setOpenHuyDonHang] = React.useState(false);
    const [selectOrderId, setSelectOrderId] = React.useState(undefined);
    const { orderDataHistory, order, orderId, totalElements } = currentState;
    const [openLyDoHuy, setOpenLyDoHuy] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            actions.fetchOrderHistory({
                params: { ...filter, current_page: page, per_page: rowsPerPage },
            })
        );
    }, [dispatch, order, orderId, filter, page, rowsPerPage]);
    const headRows = [
        { id: "stt", label: "STT" },
        { id: "order_id", label: "Mã đơn hàng" },
        { id: "fullName", label: "Tên người nhận" },
        { id: "phone", label: "Số điện thoại" },
        { id: "email", label: "Email" },
        { id: "address", label: "Địa chỉ" },
        { id: "total_product", label: "Số lượng " },
        { id: "total_price", label: "Tổng tiền" },
        { id: "createdAt", label: "Thời gian đặt hàng" },
        { id: "orderStatus", label: "Tình trạng đơn hàng" },
        { id: "hinhThucThanhToan", label: "Hình thức thanh toán" },
        { id: "lyDoHuy", label: "Lý do hủy " },
        { id: "action", label: "Hành động" },
    ];
    function handleSearch(value) {
        setFilter({
            ...filter,
            ...value
        });

    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }
    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
    }

    function handleHuyDonHang(orderId) {
        setOpenHuyDonHang(true);
        setSelectOrderId(orderId);
    }
    function closeHuyDonHang(status) {
        if (status) {
            dispatch(actions.deleteOrder(selectOrderId));
        }
        setPage(0);
        setOpenHuyDonHang(false);
    }
    const handleOpenLyDoHuy = (id) => {
        setSelectOrderId(id);
        setOpenLyDoHuy(true);
    }
    const handleCloseLyDoHuy = (status) => {
        if (status === false) {
            setOpenLyDoHuy(status);
        }
    }
    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const mapKey = [
            { label: "order_id", type: string },
            { label: "fullName", type: string },
            { label: "phone", type: string },
            { label: "email", type: string },
            { label: "address", type: string },
            { label: "total_product", type: string },
            { label: "total_price", type: string },
            { label: "createdAt", type: string },
            { label: "orderStatus", type: string },
            { label: "hinhThucThanhToan", type: string },
            { label: "lyDoHuy", type: string },
        ];
        return (
            <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell sx={{ minWidth: "70px" }}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell align="left">{props.index + 1}</TableCell>
                    {mapKey.map((item, idx) => {
                        if (item.label === "createdAt") {
                            return (
                                <TableCell key={idx} sx={{ minWidth: "200px" }}>
                                    {moment(row[item.label])
                                        .locale("vi")
                                        .format("L")}
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
                                        <Label variant="soft" color="secondary">{row[item.label]}</Label>
                                    </TableCell>
                                )
                            }
                            else {
                                return (
                                    <TableCell sx={{ minWidth: "200px" }} key={idx}>
                                        <Label variant="soft" color="warning">{row[item.label]}</Label>
                                    </TableCell>
                                )
                            }
                        }
                        if (item.label === "orderStatus") {
                            if (row.orderStatus === 0) {
                                return (
                                    <TableCell sx={{ minWidth: "200px" }} key={idx}>
                                        <Label variant="soft" >Đang chờ duyệt</Label>
                                    </TableCell>
                                )
                            }
                            else if (row.orderStatus === 2) {
                                return (
                                    <TableCell sx={{ minWidth: "200px" }} key={idx}>
                                        <Label variant="soft" color="error" >Đã hủy</Label>
                                    </TableCell>
                                )
                            }
                            else if (row.orderStatus === 3) {
                                return (
                                    <TableCell sx={{ minWidth: "200px" }} key={idx}>
                                        <Label variant="soft" className="text-orange-600" >Không được duyệt</Label>
                                    </TableCell>
                                )
                            }
                            else {
                                return (
                                    <TableCell sx={{ minWidth: "200px" }} key={idx}>
                                        <Label variant="soft" color="success" >Đã được duyệt</Label>
                                    </TableCell>
                                )
                            }
                        }
                        if (item.label === "address") {
                            return <TableCell align="left" sx={{ minWidth: "300px" }} key={idx}>{row[item.label]}</TableCell>
                        }
                        return (<TableCell align="left" sx={{ minWidth: "150px" }} key={idx}>{row[item.label]}</TableCell>)
                    })
                    }
                    <TableCell align="left" sx={{ minWidth: "180px" }}>
                        {row.orderStatus === 0 && (
                            <Tooltip title="Hủy đơn hàng">
                                <IconButton onClick={() => handleOpenLyDoHuy(row?._id)} >
                                    <AutoDeleteIcon className="text-red-700"></AutoDeleteIcon>
                                </IconButton>
                            </Tooltip>
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
                                            <TableRow key={historyRow?._id}>
                                                <TableCell component="th" scope="row">
                                                    <img src={historyRow.imageProduct} alt="anh sp" className="w-[80px] h-[80px]" />
                                                </TableCell>
                                                <TableCell align="left">{historyRow?.name}</TableCell>
                                                <TableCell align="left">{historyRow?.colors?.name}</TableCell>
                                                <TableCell align="left"><Label color="primary">{historyRow?.sizes?.size?.name}</Label></TableCell>
                                                <TableCell align="left">{historyRow?.cartQuantity}</TableCell>
                                                <TableCell align="left">{historyRow?.price_discount ? convertToVND(historyRow.price_discount * historyRow.cartQuantity) : convertToVND(historyRow.price * historyRow.cartQuantity)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    }
    return (
        <LayoutCustomer>
            <div className=" mt-5 items-center justify-center max-w-[1200px] w-full mx-auto">
                <h1 className='text-center'>Lịch sử đặt hàng</h1>
                <OrderHistoryFilter onSearch={handleSearch} />
                <Card className='my-10 shadow-xl outline-dashed'>
                    <TableContainer >
                        <Table aria-label="collapsible table">
                            <TableHead >
                                <TableRow>
                                    <TableCell className='bg-yellow-100' />
                                    {headRows?.map((item) => (
                                        <TableCell key={item.id} className='bg-yellow-100'>{item.label}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderDataHistory?.map((row, index) => (
                                    <Row key={row._id} row={row} index={index}
                                    />
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
            </div>
            <ConfirmDialog
                openDialog={openHuyDonHang}
                closeDialog={closeHuyDonHang}
                description={"Bạn có chắc chắn hủy đơn hàng này"}></ConfirmDialog>
            <ConfirmLyDoHuy
                openDialog={openLyDoHuy}
                selectOrderId={selectOrderId}
                closeDialog={handleCloseLyDoHuy}
                description={"Nhập lý do hủy đơn hàng"}></ConfirmLyDoHuy>
        </LayoutCustomer>
    );


}

export default OrderHistory;
