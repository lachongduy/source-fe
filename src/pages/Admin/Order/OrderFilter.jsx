import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Button,
    InputAdornment,
    Stack
} from "@mui/material";
import React, { useState } from "react";

import { StyledSearch } from "../../../components/search/StyleSearch";
import { TbFileExport } from "react-icons/tb";
import * as orderActions from "./api/oderAction"
import { useDispatch } from "react-redux";
const OrderFilter = (props) => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({ name: "" });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleFilter = () => {
        props.onSearch(values);
    };
    const handlExportExcel = () => {
        dispatch(orderActions.exportExcel(props.filterExportOrder));
    }
    return (
        <Box className="mx-5">
            <h1 className="font-semibold text-2xl">Quản lý đơn hàng</h1>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    spacing={3}
                    mt={2}>
                    <StyledSearch
                        value={values.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Tìm kiếm đơn hàng..."
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon
                                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                                />
                            </InputAdornment>
                        }
                    />
                    <Button type="button" variant="contained" onClick={handleFilter}>
                        Lọc
                    </Button>
                </Stack>
                <Button variant="outlined" color="success" startIcon={<TbFileExport />} onClick={handlExportExcel}>Xuất dữ liệu đơn đặt hàng</Button>
            </Stack>
        </Box>
    );
};

export default OrderFilter;
