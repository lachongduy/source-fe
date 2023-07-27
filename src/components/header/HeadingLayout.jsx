import React from "react";

const HeadingLayout = ({ className = "", children }) => {
  return <div className={`heading-layout ${className}`}>{children}</div>;
};

export default HeadingLayout;
