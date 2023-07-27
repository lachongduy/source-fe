import React from "react";

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <label htmlFor={htmlFor} {...props} className="font-semibold">
      {children}
    </label>
  );
};

export default Label;
