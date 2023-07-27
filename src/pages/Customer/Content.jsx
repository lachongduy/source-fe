
import React, { useEffect, useState } from "react";
import LayoutCustomer from "../../layouts/LayoutCustomer";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import BreadcrumbsNav from "../../components/nav-crumbs/Breadcrumbs ";
import FilterSideBar from "./FilterSideBar";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as productAction from "../Admin/Product/api/productAction";
import ListContentProduct from "./ListContentProduct";
const Content = () => {
    const { slug } = useParams();
    const defaultValues = {
        tenDanhMuc: slug,
        sizes: "",
    };
    const [filter, setFilter] = useState(defaultValues);
    const [valuesPrice, setValuePrice] = useState(null);
    const { currentState } = useSelector(
        (state) => ({ currentState: state.product }),
        shallowEqual
    );
    const { productDataDanhMuc: productData } = currentState;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productAction.fetchProductCustomer({ params: { ...filter } }));
    }, [dispatch, filter]);
    const handleFilter = (values) => {
        setFilter({
            ...filter,
            sizes: values,
        });
    };
    useEffect(() => {
        if (slug) {
            setFilter({
                ...filter,
                tenDanhMuc: slug,
            });
        }
    }, [slug]);
    const handleValuePrice = (value) => {
        setValuePrice({
            ...valuesPrice,
            ...value,
        });
    };
    const handleSearched = (type) => {
        if (type === "reset") {
            setFilter({
                ...filter,
                fromPrice: 500000,
                toPrice: 20000000,
            });
        } else {
            setFilter({
                ...filter,
                ...valuesPrice,
            });
        }
    };
    return (
        <LayoutCustomer>
            <Box className="max-w-[1200px] w-full mx-auto mb-5">
                <Box sx={{ paddingY: "20px" }}>
                    <BreadcrumbsNav title="Trang chủ" subtitle={slug} />
                </Box>
                <Grid container>
                    <Grid item md={3}>
                        <FilterSideBar
                            onFilter={handleFilter}
                            valuePrice={handleValuePrice}
                            onSearched={handleSearched}
                        />
                    </Grid>
                    <Grid item md={9}>
                        <ListContentProduct data={productData ? productData : null} />
                    </Grid>
                </Grid>
            </Box>
        </LayoutCustomer>
    );
};

export default Content;