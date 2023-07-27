import React from "react";
import { alpha } from "@mui/material/styles";
import { Stack, Typography, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
const DashboardAnalytic = ({ children, color, percent, title, total }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: 1, minWidth: 200 }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ position: "relative" }}>
        {children}
        <CircularProgress
          variant="determinate"
          value={100}
          size={56}
          thickness={4}
          className={`${color} opacity-[0.48]`}
        />

        <CircularProgress
          variant="determinate"
          value={100}
          size={56}
          thickness={4}
          sx={{
            top: 0,
            left: 0,
            opacity: 0.48,
            position: "absolute",
            color: (theme) => alpha(theme.palette.grey[500], 0.16),
          }}
        />
      </Stack>

      <Stack spacing={0.5} sx={{ ml: 2 }}>
        <Typography variant="subtitle2">
          <Link to={`/Admin/Order/`}>
            {title}
          </Link>
        </Typography>

        <Typography variant="subtitle2">
          {total}{" "}
          <Box
            component="span"
            sx={{ color: "text.secondary", typography: "body2" }}>
            đơn hàng
          </Box>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DashboardAnalytic;
