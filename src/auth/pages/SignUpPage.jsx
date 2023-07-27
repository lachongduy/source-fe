import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { RiUserSmileLine } from "react-icons/ri";
import { injectIntl } from "react-intl";
import { connect, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Field } from "../../components/field";
import { Input, InputPasswordToggle } from "../../components/input";
import InputPasswordToggleConfirm from "../../components/input/InputPasswordToggleConfirm";
import { register } from "../_redux/authCrud";
import * as auth from "../_redux/authRedux";
import AuthenticatePage from "./AuthenticatePage";
import { Button, CircularProgress } from "@mui/material";

const SignUpPage = (props) => {
  const [loading, setLoading] = useState(false);
  const schemaValidation = Yup.object().shape({
    fullName: Yup.string().required("Vui lòng nhập họ và tên"),
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Vui lòng nhập địa chỉ email hợp lệ"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu của bạn phải có ít nhất 8 ký tự trở lên"),
    confirmpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Mật khẩu không khớp"
    ),
  });
  const {
    control,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },

  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  const handleSumitSignUp = async (values) => {
    const { email, password, fullName } = values;
    const cloneValue = {
      email,
      password,
      fullName,
    };
    if (!isValid) return;
    enableLoading();
    setTimeout(() => {
      register(cloneValue)
        .then((res) => {
          const token = res.data;
          disableLoading();
          props.register(token);
          navigate("/sign-in");
        })
        .catch(() => { })
        .finally(() => {
          disableLoading();
        });
    }, 500);
  };
  return (
    <AuthenticatePage>
      <form onSubmit={handleSubmit(handleSumitSignUp)}>
        <Field>
          <Input
            placeholder="Email của bạn"
            control={control}
            name="email"
            type="email">
            <MdAlternateEmail />
          </Input>
          {errors && <p className="text-red-600">{errors.email?.message}</p>}
        </Field>
        <Field>
          <Input
            placeholder="Họ và tên"
            control={control}
            name="fullName"
            type="text">
            <RiUserSmileLine />
          </Input>
          {errors && <p className="text-red-600">{errors.fullName?.message}</p>}
        </Field>
        <Field>
          <InputPasswordToggle
            placeholder="Mật khẩu"
            control={control}
            name="password"
            type="password">
            <RiUserSmileLine />
          </InputPasswordToggle>
          {errors && <p className="text-red-600">{errors.password?.message}</p>}
        </Field>
        <Field>
          <InputPasswordToggleConfirm
            placeholder="Nhập lại mật khẩu"
            control={control}
            name="confirmpassword"
            type="password">
            <RiUserSmileLine />
          </InputPasswordToggleConfirm>
          {errors && (
            <p className="text-red-600">{errors.confirmpassword?.message}</p>
          )}
        </Field>
        <Button
          type="submit"
          fullWidth
          className="my-5"
          variant="contained"
          disabled={isSubmitting}>
          {loading ? <CircularProgress color="info" size={24} /> : "Đăng ký"}
        </Button>
        <div className="font-semibold mb-5 text-center text-blue-500">
          Bạn đã có tài khoản?{" "}
          <NavLink className="text-blue-500 underline ml-5" to="/sign-in">
            Đăng nhập
          </NavLink>
        </div>
      </form>
    </AuthenticatePage>
  );
};

export default injectIntl(connect(null, auth.actions)(SignUpPage));
