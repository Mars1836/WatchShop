import React, { useEffect } from "react";
import SignInForm from "../../components/LoginForm/SignInForm";
import DefaultLayout from "../../layout/DefaultLayout";
import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import RequireNotAuth from "../../services/RequireNotAuth";
const cx = classNames.bind(styles);
function Login() {
  return (
    <RequireNotAuth>
      <div className={cx("login")}>
        <DefaultLayout>
          <div className={cx("container")}>
            <Grid container justifyContent={"center"}>
              <Grid item xs={12} sm={8} md={6}>
                <div className={cx("wrap")}>
                  <SignInForm></SignInForm>
                </div>
              </Grid>
            </Grid>
          </div>
        </DefaultLayout>
      </div>
    </RequireNotAuth>
  );
}

export default Login;
