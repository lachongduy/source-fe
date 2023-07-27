import React from "react";

const Field = ({ children, className }) => {
  return (
    <div className={`flex flex-col gap-3 mb-5 ${className}`}>{children}</div>
  );
};

export default Field;
