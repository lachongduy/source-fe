import CategoryIcon from "@mui/icons-material/Category";
import CollectionsIcon from "@mui/icons-material/Collections";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DoNotStepIcon from "@mui/icons-material/DoNotStep";
import PhotoIcon from "@mui/icons-material/Photo";
import PostAddIcon from "@mui/icons-material/PostAdd";
import WrapTextIcon from "@mui/icons-material/WrapText";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ContactsIcon from "@mui/icons-material/Contacts";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
const Sidebar = () => {
  const CustomLink = ({ children, to, ...props }) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    return (
      <li className={`${match ? "nav-item active" : "nav-item"} mb-1`}>
        <Link className="nav-link text-[#979EA9]" to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  };
  const [open, setOpen] = useState({
    settings: false,
  });

  const handleClick = (item) => {
    setOpen((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };
  return (
    <div className="w-full bg-[#1C2536] p-4 h-full overflow-y-auto scrollbar">
      <Link to="/">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingY: 2,
          }}>
          <Typography className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            HD-STORE
          </Typography>
        </Box>
      </Link>
      <Divider />
      <List
        sx={{ width: "100%", height: "100%", borderRadius: "16px" }}
        component="nav"
        aria-labelledby="nested-list-subheader">
        <CustomLink to="/admin">
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </CustomLink>

        <CustomLink to="/admin/category">
          <ListItemButton>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý danh mục" />
          </ListItemButton>
        </CustomLink>

        <CustomLink to="/admin/banner">
          <ListItemButton>
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý ảnh bìa" />
          </ListItemButton>
        </CustomLink>

        <CustomLink to="/admin/new">
          <ListItemButton>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý  tin tức" />
          </ListItemButton>
        </CustomLink>

        <CustomLink to="/admin/user">
          <ListItemButton>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý người dùng" />
          </ListItemButton>
        </CustomLink>
        <CustomLink to="/admin/order">
          <ListItemButton>
            <ListItemIcon>
              <FactCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý đơn hàng" />
          </ListItemButton>
        </CustomLink>
        <CustomLink to="/admin/product">
          <ListItemButton>
            <ListItemIcon>
              <DynamicFeedIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý sản phẩm" />
          </ListItemButton>
        </CustomLink>

        <ListItemButton
          onClick={() => handleClick("settings")}
          className="hover:rounded-lg">
          <ListItemIcon>
            <SettingsSuggestIcon />
          </ListItemIcon>
          <ListItemText primary="Cài đặt" className="text-[#979EA9]" />
          {open.settings ? (
            <ExpandLess className="text-[#979EA9]" />
          ) : (
            <ExpandMore className="text-[#979EA9]" />
          )}
        </ListItemButton>

        <Collapse in={open.settings} unmountOnExit>
          <List component="div" disablePadding>
            <CustomLink to="/admin/typeProduct">
              <ListItemButton key="typeProduct" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <WrapTextIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý loại sản phẩm" />
              </ListItemButton>
            </CustomLink>
            <CustomLink to="/admin/color">
              <ListItemButton key="colors" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ColorLensIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý màu sắc" />
              </ListItemButton>
            </CustomLink>
            <CustomLink to="/admin/size">
              <ListItemButton key="sizes" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <DoNotStepIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý size" />
              </ListItemButton>
            </CustomLink>
            <CustomLink to="/admin/image">
              <ListItemButton key="image" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PhotoIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý ảnh sản phẩm" />
              </ListItemButton>
            </CustomLink>

          </List>
        </Collapse>

      </List>
    </div>
  );
};

export default Sidebar;
