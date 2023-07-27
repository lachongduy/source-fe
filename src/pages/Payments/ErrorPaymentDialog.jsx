import { Box, Dialog, DialogTitle, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import Alert from '@mui/material/Alert/Alert';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import TableCell from '@mui/material/TableCell/TableCell';
import React from 'react';

const ErrorPaymentDialog = (props) => {
    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="lg">
            <DialogTitle>Chưa thể đặt hàng</DialogTitle>
            <Box sx={{ paddingX: "20px" }}>
                <Alert severity="error">Vui lòng kiểm tra lại</Alert>
            </Box>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên sản phẩm </TableCell>
                                <TableCell align="right">Size</TableCell>
                                <TableCell align="right">Số lượng đặt hàng</TableCell>
                                <TableCell align="right">Số lượng sản phẩm</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.dataError?.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.size}</TableCell>
                                    <TableCell align="right">{row.soLuongDatHang}</TableCell>
                                    <TableCell align="right">{row.soLuongTonKho}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
};

export default ErrorPaymentDialog;