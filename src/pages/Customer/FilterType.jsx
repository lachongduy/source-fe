import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from "../Admin/TypeProduct/api/typeAction";
import { Checkbox, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const FilterType = (props) => {
    const [filter, setFilter] = React.useState({ name: '' });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            actions.fetchTypeCustomer({
                params: { ...filter },
            })
        );
    }, [dispatch]);

    const { currentState } = useSelector(
        (state) => ({ currentState: state.typeProducts }),
        shallowEqual
    );

    const { data } = currentState;
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    // Chia danh sách thành hai danh sách con
    const halfLength = Math.ceil(data?.length / 2);
    const firstHalf = data?.slice(0, halfLength);
    const secondHalf = data?.slice(halfLength);

    return (
        <Grid container spacing={2}>
            <div className="mt-2 px-4 text-center pt-5 ">
                <span className="text-xl text-black font-semibold  " >
                    Theo loại giày
                </span>
            </div>
            <Grid item xs={6}>
                <List sx={{ width: '100%', maxWidth: 260 }}>
                    {firstHalf?.map((item, index) => {
                        const labelId = `checkbox-list-label-${item.typeProducts}`;
                        return (
                            <ListItem
                                sx={{ color: 'blue' }}
                                key={index}
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(item.name)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(item.name) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${item.typeProducts.name}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>

            <Grid item xs={6}>
                <List sx={{ width: '100%', maxWidth: 260 }}>
                    {secondHalf?.map((item, index) => {
                        const labelId = `checkbox-list-label-${item.name}`;

                        return (
                            <ListItem
                                sx={{ color: 'blue' }}
                                key={index}
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(item.name)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(item.name) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${item.name}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
        </Grid>
    );
}

export default FilterType;