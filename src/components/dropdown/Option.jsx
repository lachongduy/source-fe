import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="px-4 py-3 cursor-pointer flex items-center justify-between hover:bg-gray-100 z-50 text-sm"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
