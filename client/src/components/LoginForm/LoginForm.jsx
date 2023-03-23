import React, { useState, useLayoutEffect } from "react";
import classNames from "classnames/bind";
import styles from "./loginForm.module.scss";
import { Divider } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

function LoginForm() {
  const cx = classNames.bind(styles);
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className={cx("login_form")}>
      <div className={cx("top")}>
        <span
          className={cx({ active: isSignIn })}
          onClick={() => {
            setIsSignIn(true);
          }}
        >
          Sign in
        </span>
        <span
          className={cx({ active: !isSignIn })}
          onClick={() => {
            setIsSignIn(false);
          }}
        >
          Sign up
        </span>
      </div>
      <div className={cx("body")}>
        {isSignIn ? (
          <SignInForm></SignInForm>
        ) : (
          <SignUpForm setIsSignIn={setIsSignIn}> </SignUpForm>
        )}
      </div>
      <div className={cx("bottom")}>
        <Divider sx={{ color: "gray", fontSize: "14px" }}>
          or sign in with:
        </Divider>
        <div className={cx("login_")}>
          <div className={cx("lg_w", "google")}>
            <GoogleIcon className={cx("icon")} />
          </div>
          <div className={cx("lg_w", "fb")}>
            <FacebookOutlinedIcon className={cx("icon")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
