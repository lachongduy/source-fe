import React from "react";
import { useController } from "react-hook-form";
/**
 *
 * @param {*} placeholder(optional) - Placeholder of input
 * @param {*} name(optional) - name of input
 * @param {*} control - control from react hook form
 * @returns Input
 */
const TextArea = ({
  name = "",
  type = "text",
  control,
  children,
  ...props
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <div className="flex flex-col relative w-full">
      <textarea
        id={name}
        type={type}
        {...props}
        {...field}
        className={`pt-4 pl-4 ${children ? "pr-[60px]" : "pr-[16px]"
          } pb-4 bg-white-100 border-2 border-blue-400  rounded-lg min-h-[150px] outline-none focus:border-blue-500 transition-all dark:text-black`}
      />
      {children ? (
        <span className="absolute right-[20px] top-[10%] translate-y-2/4 text-2xl cursor-pointer text-gray-500 dark:text-black">
          {children}
        </span>
      ) : null}
    </div>
  );
};

export default TextArea;
