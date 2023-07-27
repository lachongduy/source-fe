import { Logout, Settings } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { actions } from "../../auth/_redux/authRedux";
import { AvatarDefault } from "../../utils/avatarDefault";
import { useSearchContext } from "../../context/SearchContext";
const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 380,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  // "&.Mui-focused": {
  //   width: 380,
  //   boxShadow: theme.customShadows.z8,
  // },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

const HeaderCustomer = () => {
  const { currentState, cartState } = useSelector(
    (state) => ({
      currentState: state.auth,
      cartState: state.cart,
    }),
    shallowEqual
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authToken } = currentState;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { state, dispatch: dispatchSearch } = useSearchContext()
  const [values, setValues] = useState({ name: "" })
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    dispatch(actions.logout());
    window.location.href = "/";
  };
  return (
    <Box className="flex items-center justify-between p-4 max-w-[1200px] w-full mx-auto bg-white">
      <NavLink to="/">
        <img
          srcSet="/img/logo_img.jpg"
          alt=""
          className="w-[150px] h-[40px] object-cover"
        />
      </NavLink>
      <StyledSearch
        name={values.name}
        placeholder="Tìm kiếm sản phẩm tại đây..."
        size="small"
        onChange={(e) => setValues({
          ...values,
          name: e.target.value
        })}
        startAdornment={
          <InputAdornment position="start" onClick={() => dispatchSearch({ type: "set-name", payload: values.name })}>
            <SearchIcon
              sx={{ color: "text.primary", width: 30, height: 30, cursor: "pointer" }}
            />
          </InputAdornment>
        }
      />
      <Stack direction="row" spacing={2}>
        {/* <IconButton
        >
          <Badge badgeContent={cart?.length} color="primary">
            <ShoppingBasketIcon onClick={() => navigate("/cart")} />
          </Badge>
        </IconButton> */}
        {currentState?.authToken?.user ? (
          <div className="flex items-center gap-x-2">
            <span>{authToken?.user?.fullName}</span>
            <img
              src={!authToken?.user?.image ? AvatarDefault.avatarMale : currentState?.user?.image}
              alt=""
              className="w-[42px] h-[42px] object-cover rounded-full cursor-pointer"
              onClick={handleClick}
            />
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
              <MenuItem onClick={() => navigate("/user/infomations")}>
                <ListItemIcon>
                  <PersonOutlineIcon fontSize="small" />
                </ListItemIcon>
                Cập nhật tài khoản
              </MenuItem>
              <MenuItem onClick={() => navigate("/user/order/history")}>
                <ListItemIcon>
                  <PlaylistAddCheckIcon fontSize="small" />
                </ListItemIcon>
                Lịch sử đặt hàng
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Cài đặt
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Đăng xuất
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            variant="outlined"
            startIcon={<PersonOutlineIcon />}
            onClick={() => navigate("/sign-in")}>
            Đăng nhập
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default React.memo(HeaderCustomer);
