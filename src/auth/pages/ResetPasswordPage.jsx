import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RiUserSmileLine } from "react-icons/ri";
import { injectIntl } from "react-intl";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { InputPasswordToggle } from "../../components/input";
import InputPasswordToggleConfirm from "../../components/input/InputPasswordToggleConfirm";
import LoadingSubmit from "../../components/loading/LoadingSubmit";
import { resetPassword } from "../_redux/authCrud";
import * as auth from "../_redux/authRedux";
import AuthenticatePage from "./AuthenticatePage";

const ResetPasswordPage = (props) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { token } = Object.fromEntries(new URLSearchParams(location.search));
  const schemaValidation = Yup.object().shape({
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Your password must be at least 8 characters or greater"),
    confirmpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords don't match"
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
  const handleSumitLogin = async (values) => {
    const { password } = values;
    const cloneValue = {
      password,
      token: token,
    };
    if (!isValid) return;
    enableLoading();
    setTimeout(() => {
      resetPassword(cloneValue)
        .then((res) => {
          const password = res.data;
          disableLoading();
          props.resetPassword(password);
          navigate("/sign-in");
        })
        .catch(() => {})
        .finally(() => {
          disableLoading();
        });
    }, 500);
  };
  return (
    <AuthenticatePage>
      <form onSubmit={handleSubmit(handleSumitLogin)}>
        <Field>
          <InputPasswordToggle
            placeholder="Mật khẩu mới"
            control={control}
            name="password"
            type="password">
            <RiUserSmileLine />
          </InputPasswordToggle>
          {errors && <p className="text-red-600">{errors.password?.message}</p>}
        </Field>
        <Field>
          <InputPasswordToggleConfirm
            placeholder="Nhập lại mật khẩu mới"
            control={control}
            name="confirmpassword"
            type="password">
            <RiUserSmileLine />
          </InputPasswordToggleConfirm>
          {errors && (
            <p className="text-red-600">{errors.confirmpassword?.message}</p>
          )}
        </Field>
        <Button type="submit" className="w-full my-8" disabled={isSubmitting}>
          {loading ? <LoadingSubmit /> : "Cập nhật mật khẩu"}
        </Button>
      </form>
    </AuthenticatePage>
  );
};

export default injectIntl(connect(null, auth.actions)(ResetPasswordPage));
