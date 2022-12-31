import React, { useState, useLayoutEffect } from "react";
import classNames from "classnames/bind";
import styles from "./loginForm.module.scss";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "../Button/Button";
import { Divider } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

let schemaSignUp = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
  re_password: yup.string().required(),
});
function SignUpForm() {
  const cx = classNames.bind(styles);
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignUp),
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignUpSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className={cx("form")} onSubmit={handleSubmit(handleSignUpSubmit)}>
      <h3 className={cx("title")}>Sign up</h3>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        className={cx("input")}
        {...register("email")}
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
      />
      <TextField
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        label={"Password"}
        {...register("password")}
        error={Boolean(errors.password?.message)}
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

      <TextField
        id="outlined-adornment-password"
        type={showRePassword ? "text" : "password"}
        label="Comfirm password"
        className={cx("input")}
        {...register("re_password")}
        error={Boolean(errors.re_password?.message)}
        helperText={errors.re_password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowRePassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showRePassword ? <VisibilityOff /> : <Visibility />}
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
        value="Sign Up"
      ></input>
    </form>
  );
}

export default SignUpForm;
