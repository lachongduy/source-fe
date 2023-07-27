import React, { Fragment, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
// import Input from "./Input";
import InputToggle from "./InputToggle";
const InputPasswordToggle = ({ control, placeholder, ...other }) => {
  const [togglePass, setTogglePass] = useState(false);
  if (!control) return;
  return (
    <Fragment>
      <InputToggle
        type={togglePass ? "text" : "password"}
        name="password"
        control={control}
        {...other}
        placeholder={`${placeholder}`}>
        {!togglePass ? (
          <BsEyeSlash onClick={() => setTogglePass(!togglePass)} />
        ) : (
          <BsEye onClick={() => setTogglePass(!togglePass)} />
        )}
      </InputToggle>
    </Fragment>
  );
};

export default InputPasswordToggle;
