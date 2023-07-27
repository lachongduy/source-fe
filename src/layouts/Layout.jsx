import { Box, Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { TopNav } from "./TopNav";

const Layout = ({ children }) => {
  return (
    <div className="h-[100vh] bg-[#FCFCFC]">
      <Grid container>
        <Grid item sm={2.5}>
          <Box sx={{height:"100vh"}}>
            <Sidebar/>
          </Box>
        </Grid>
        <Grid item sm={9.5}>
        <Box sx={{height:"100vh"}}>
          <div className="overflow-y-scroll h-full scrollbar">
          <TopNav/>
            {children}
            <Outlet></Outlet>
          </div>
        </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
