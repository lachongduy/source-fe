import React from "react";
import PropTypes from "prop-types";
const LabelStatus = ({
  children,
  type = "default",
  onClick = () => {},
  className = "",
}) => {
  let styleClassName = "text-gray-500 bg-gray-100";
  switch (type) {
    case "success":
      styleClassName = "text-green-500 bg-green-100";
      break;
    case "warning":
      styleClassName = "text-orange-500 bg-orange-100";
      break;
    case "danger":
      styleClassName = "text-red-500 bg-red-100";
      break;
    default:
      break;
  }
  return (
    <div
      className={`${styleClassName} inline-block py-[10px] px-[15px] rounded-lg font-medium text-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
LabelStatus.prototype = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["default", "success", "warning", "danger"]).isRequired,
};
export default LabelStatus;
