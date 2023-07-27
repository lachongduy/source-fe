import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";
import { RiLockPasswordLine } from "react-icons/ri";
const InputToggle = ({
  name = "",
  type = "text",
  control,
  children,
  ...props
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <TextField
      {...props}
      {...field}
      type={type}
      sx={{ backgroundColor: "white", borderRadius: "6px" }}
      InputProps={{
        sx: { cursor: "pointer" },
        startAdornment: (
          <InputAdornment position="start">{RiLockPasswordLine}</InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">{children}</InputAdornment>
        ),
      }}
    />
  );
};

export default InputToggle;
