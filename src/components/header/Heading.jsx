import React from "react";

const Heading = ({ className = "mb-5 mt-0 text-3xl font-medium leading-tight text-primary", children }) => {
  return <div className={` ${className}`}>{children}</div>;
};

export default Heading;
