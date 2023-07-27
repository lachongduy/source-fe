import { Box } from '@mui/material';
import { isNull } from 'lodash';
import React from 'react';
import { NavLink } from 'react-router-dom';



const Navbar = (props) => {
    if (isNull(props.dataCategory)) {
        return;
    }
    return (
        <Box sx={{ padding: "10px" }}>
            {
                props.dataCategory.map((item, index) => (
                    <NavLink key={index} to={`/danhmuc/${item.name.toLowerCase()}`} className="p-4 menu-item text-white text-lg ">
                        {
                            item.name.toUpperCase()
                        }
                    </NavLink>
                ))
            }
        </Box>
    );
};

export default Navbar;