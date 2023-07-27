import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

/**
 *
 * @param {*} placeholder(optional) - Placeholder of input
 * @param {*} name(optional) - name of input
 * @param {*} control - control from react hook form
 * @returns Input
 */
const InputAdmin = ({
  name = "",
  type = "text",
  control,
  children,
  ...props
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <TextField
      fullWidth
      {...props}
      type={type}
      {...field}
      sx={{ backgroundColor: "white", borderRadius: "6px" }}
    />
  );
};

export default InputAdmin;
