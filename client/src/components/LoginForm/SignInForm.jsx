import React, { useState, useLayoutEffect } from "react";
import classNames from "classnames/bind";
import styles from "./loginForm.module.scss";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Divider } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
let schemaSignIn = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

function SignInForm() {
  const cx = classNames.bind(styles);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignIn),
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const resetValue = () => {
    reset();
  };
  const handleSignInSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className={cx("form")} onSubmit={handleSubmit(handleSignInSubmit)}>
      <h3 className={cx("title")}>Sign in</h3>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        className={cx("input")}
        {...register("email")}
        helperText={errors.email?.message}
        error={Boolean(errors.email?.message)}
      />

      <TextField
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        {...register("password")}
        error={Boolean(errors.password?.message)}
        label={"Password"}
        helperText={errors.password?.message}
        className={cx("input")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <span className={cx("fg_pas")}>For got password</span>
      <input
        type="submit"
        className={cx("btn_submit")}
        variant="contained"
        animate="none"
        value={"Submit"}
      />
    </form>
  );
}

export default SignInForm;
