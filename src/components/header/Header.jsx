import { Logout } from "@mui/icons-material";
import { Avatar, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { AiOutlineLeft, AiOutlineMenu } from "react-icons/ai";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actions } from "../../auth/_redux/authRedux";
import { AvatarDefault } from "../../utils/avatarDefault";

const Header = (props) => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.auth }),
    shallowEqual
  );
  const { fullName, email } = currentState?.authToken?.user;
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
  const handleOpenSideBar = (status) => {
    props.onOpen(status);
  };
  const handleCloseSideBar = (status) => {
    props.onOpen(status);
  };
  return (
    <div className="px-6 py-3  text-white shadow-">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          {props.open === false ? (
            <AiOutlineMenu
              onClick={() => handleOpenSideBar(true)}
              className="w-[25px] h-[40px] cursor-pointer"></AiOutlineMenu>
          ) : (
            <AiOutlineLeft
              onClick={() => handleCloseSideBar(false)}
              className="w-[25px] h-[40px] cursor-pointer"></AiOutlineLeft>
          )}
          <Link to="/">
            <img
              srcSet="/img/logo_img.jpg"
              alt=""
              className="w-[150px] h-[40px] object-cover"
            />

          </Link>
        </div>
        <div className="flex items-center gap-x-2">
          <span>{fullName}</span>
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
                <h3 style={{ fontWeight: 700 }}>{fullName}</h3>
                <span>{email}</span>
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
      </div>
    </div>
  );
};

export default Header;
