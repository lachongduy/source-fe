import { Logout } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";
import { AvatarDefault } from "../utils/avatarDefault";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../auth/_redux/authRedux";
const SIDE_NAV_WIDTH = 0;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.auth }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(actions.logout());
    navigate("/logout");
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}>
          <Stack alignItems="center" direction="row" spacing={2}>
            {/* <Tooltip title="Tìm kiếm">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </Tooltip> */}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Thông báo">
              <IconButton>
                <Badge badgeContent={4} color="success" variant="dot">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <div className="flex items-center gap-x-2">
              <span>{currentState?.user?.fullName}</span>
              <img
                src={AvatarDefault.avatarMale}
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
                style={{ paddingBottom: 0, paddingTop: 0 }}
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
                <MenuItem
                  style={{
                    backgroundColor: "#2065D1",
                    color: "white",
                    borderTopLeftRadius: "4px",
                    borderTopRightRadius: "4px",
                  }}>
                  <div>
                    <h3 style={{ fontWeight: 700 }}>
                      {currentState?.user?.fullName}
                    </h3>
                    <span>{currentState?.user?.email}</span>
                  </div>
                </MenuItem>
                <hr />
                <MenuItem>
                  <Avatar /> Cập nhật thông tin
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="large" />
                  </ListItemIcon>
                  Đăng xuất
                </MenuItem>
              </Menu>
            </div>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
