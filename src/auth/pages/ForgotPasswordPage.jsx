import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLeft } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { injectIntl } from "react-intl";
import { connect, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { forgotPassword } from "../_redux/authCrud";
import * as auth from "../_redux/authRedux";
import AuthenticatePage from "./AuthenticatePage";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { LoadingSubmit } from "../../components/loading";

const ForgotPasswordPage = (props) => {
  const [loading, setLoading] = useState(false);

  const schemaValidation = Yup.object().shape({
    email: Yup.string()
      .required("Please enter your email")
      .email("Please enter valid email address"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
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
    if (!isValid) return;
    enableLoading();
    setTimeout(() => {
      forgotPassword(values)
        .then((res) => {
          const email = res.data;
          disableLoading();
          props.forgotPassword(email);
          Swal.fire({
            title: "Notifycation",
            text: `${res.data}`,
            icon: "success",
            confirmButtonText: "OK",
          });
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
          <Input
            placeholder="Email của bạn"
            control={control}
            name="email"
            type="email">
            <MdAlternateEmail />
          </Input>
          {errors && <p className="text-red-600">{errors.email?.message}</p>}
        </Field>
        <Button type="submit" className="w-full my-8" disabled={isSubmitting}>
          {loading ? <LoadingSubmit /> : "Gửi"}
        </Button>
        <div className="font-semibold mb-5 flex items-center p-4 max-w-[250px]">
          <AiOutlineLeft className="text-button"></AiOutlineLeft>
          <NavLink className="text-button ml-2" to="/sign-in">
            Trở về trang Đăng nhập
          </NavLink>
        </div>
      </form>
    </AuthenticatePage>
  );
};

export default injectIntl(connect(null, auth.actions)(ForgotPasswordPage));
