import { Box, Button, InputAdornment, Stack } from '@mui/material';
import React, { useState } from 'react';
import { StyledSearch } from '../../../components/search/StyleSearch';

import SearchIcon from "@mui/icons-material/Search";
const OrderHistoryFilter = (props) => {
    const [values, setValues] = useState({ order_id: "" });
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

    return (
        <Box>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                spacing={3}
                mt={2}>
                <StyledSearch
                    value={values.order_id}
                    name="order_id"
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
        </Box>
    );
};

export default OrderHistoryFilter;