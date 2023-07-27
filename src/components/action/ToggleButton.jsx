import { useState, useEffect } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Tooltip, Box, IconButton, Badge } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { shallowEqual, useSelector } from 'react-redux';
// utils
//
//

// ----------------------------------------------------------------------


export default function ToggleButton({ notDefault, open, onToggle }) {
    const theme = useTheme();

    const [mounted, setMounted] = useState(false);
    const { cartState } = useSelector(
        (state) => ({

            cartState: state.cart,
        }),
        shallowEqual
    );
    const { cart } = cartState
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    return (
        <Box
            sx={{
                p: 0.5,
                right: 24,
                bottom: "50%",
                zIndex: 999,
                position: 'fixed',
                borderRadius: '50%',
                boxShadow: `-12px 12px 32px -4px ${alpha(
                    theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.black,
                    0.36
                )}`,
            }}
        >
            <Tooltip title="Giỏ hàng">
                <Badge badgeContent={cart?.length} color="primary">
                    <IconButton color="primary" onClick={onToggle} sx={{ p: 1.25 }}>
                        <ShoppingBagIcon />
                    </IconButton>
                </Badge>

            </Tooltip>
        </Box>
    );
}
