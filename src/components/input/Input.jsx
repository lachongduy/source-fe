import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";
/**
 *
 * @param {*} placeholder(optional) - Placeholder of input
 * @param {*} name(optional) - name of input
 * @param {*} control - control from react hook form
 * @returns Input
 */
const Input = ({ name = "", type = "text", control, children, ...props }) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <TextField
      {...props}
      {...field}
      sx={{ backgroundColor: "white", borderRadius: "6px" }}
      InputProps={{
        ...props,
        startAdornment: (
          <InputAdornment position="start">{children}</InputAdornment>
        ),
      }}
    />
  );
};

export default Input;
