import React from "react";
import { useController } from "react-hook-form";
import { TextField, InputAdornment } from "@mui/material";
/**
 *
 * @param {*} placeholder(optional) - Placeholder of input
 * @param {*} name(optional) - name of input
 * @param {*} control - control from react hook form
 * @returns Input
 */
const InputSearch = ({
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
      sx={{ backgroundColor: "white", borderRadius: "6px" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{children}</InputAdornment>
        ),
      }}
    />
  );
};

export default InputSearch;
