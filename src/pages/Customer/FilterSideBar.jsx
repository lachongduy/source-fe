import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../Admin/Sizes/api/sizeAction";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Button, Slider } from "@mui/material";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
function valuetext(value) {
    return `${value}°C`;
}
const minDistance = 1000000;
const FilterSideBar = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchSizeCustomer());

    }, [dispatch]);
    const { currentState } = useSelector(
        (state) => ({ currentState: state.sizes, }),
        shallowEqual
    );
    const { data } = currentState;

    const handleAutocompleteChange = (event, values) => {
        const nameArr = values.map((item) => item.name);
        props.onFilter(nameArr.toString());
    };
    const [value1, setValue1] = React.useState([500000, 20000000]);
    const [valuesInput, setValueInput] = React.useState({
        fromPrice: 500000,
        toPrice: 20000000,
    });
    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
            setValueInput({
                ...valuesInput,
                fromPrice: Math.min(newValue[0], value1[1] - minDistance),
            });
            const cloneValuesPrice = {
                ...valuesInput,
                fromPrice: Math.min(newValue[0], value1[1] - minDistance),
            };
            props.valuePrice(cloneValuesPrice);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
            setValueInput({
                ...valuesInput,
                toPrice: Math.max(newValue[1], value1[0] + minDistance),
            });
            const cloneValuesPrice = {
                ...valuesInput,
                toPrice: Math.max(newValue[1], value1[0] + minDistance),
            };
            props.valuePrice(cloneValuesPrice);
        }
    };
    const handleReset = (e) => {
        e.preventDefault();
        setValueInput({
            fromPrice: 500000,
            toPrice: 20000000,
        });
        setValue1([500000, 20000000]);
    };
    return (
        <div>
            <div>
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={data || []}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.name}
                        </li>
                    )}
                    style={{ width: "100%" }}
                    onChange={handleAutocompleteChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Chọn theo size" placeholder="Sizes" />
                    )}
                />
            </div>

            <div className="py-5 ">
                <h3>Lọc theo giá</h3>
                <div className="flex items-center pb-5">
                    <TextField
                        id="outlined-basic"
                        //onChange={handleRangeInput}
                        value={Number(valuesInput.fromPrice).toLocaleString("en")}
                        name="fromPrice"
                    />
                    <span>-</span>
                    <TextField
                        id="outlined-basic"
                        // onChange={handleRangeInput}
                        name="toPrice"
                        value={Number(valuesInput.toPrice).toLocaleString("en")}
                    />
                </div>
                <Slider
                    min={500000}
                    max={20000000}
                    getAriaLabel={() => "Minimum distance"}
                    value={value1}
                    onChange={handleChange1}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                />
            </div>
            <div className=" flex justify-between">
                <Button
                    variant="contained"
                    color="secondary"
                    className="w-[48%] "
                    onClick={() => props.onSearched("filter")}>
                    Lọc
                </Button>

                <Button
                    onClick={(e) => {
                        handleReset(e);
                        props.onSearched("reset");
                    }}
                    variant="contained"
                    color="secondary"
                    className="w-[48%]">
                    Bỏ chọn
                </Button>
            </div>
        </div>
    );
};

export default FilterSideBar;