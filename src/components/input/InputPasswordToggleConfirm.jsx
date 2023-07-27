import React, { Fragment, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
// import Input from "./Input";
import InputToggle from "./InputToggle";
const InputPasswordToggleConfirm = ({ control, placeholder }) => {
  const [togglePass, setTogglePass] = useState(false);
  if (!control) return;
  return (
    <Fragment>
      <InputToggle
        type={togglePass ? "text" : "password"}
        name="confirmpassword"
        control={control}
        placeholder={`${placeholder}`}
      >
        {!togglePass ? (
          <BsEyeSlash onClick={() => setTogglePass(!togglePass)} />
        ) : (
          <BsEye onClick={() => setTogglePass(!togglePass)} />
        )}
      </InputToggle>
    </Fragment>
  );
};

export default InputPasswordToggleConfirm;
