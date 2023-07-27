import React from "react";
import { useController } from "react-hook-form";

const Radio = ({
  checked,
  children,
  control,
  name,
  defaultCheck,
  className,
  ...rest
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label
      className={`flex items-center gap-x-2 font-medium cursor-pointer p-4 ${className}`}
    >
      <input
        onChange={() => {}}
        checked={checked}
        type="radio"
        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 rounded-full cursor-pointer"
        {...field}
        {...rest}
      />
      <span>{children}</span>
      {/* <div className="flex items-center gap-x-3 font-medium cursor-pointer">
        <div
          className={`w-5 h-5 rounded-full ${
            checked ? "bg-green-400" : "bg-gray-200"
          }`}
        ></div>
      </div> */}
    </label>
  );
};

export default Radio;
