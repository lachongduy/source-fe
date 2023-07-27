import React from "react";

const ToggleSmall = (props) => {
  const { on, onClick, ...rest } = props;
  return (
    <label className="w-[70px]">
      <input
        type="checkbox"
        checked={on}
        onClick={onClick}
        className="hidden-input"
        onChange={() => {}}
      />
      <div
        className={`inline-block w-[58px] h-[28px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? "bg-secondary" : "bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`transition-all w-[26px] h-[20px] bg-white rounded-full inline-block ${
            on ? "translate-x-[24px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

export default ToggleSmall;
