import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import classNames from "classnames/bind";
import styles from "./register.module.scss";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import SignUpForm from "../../components/LoginForm/SignUpForm";
import RequireNotAuth from "../../services/RequireNotAuth";
const cx = classNames.bind(styles);
function Register() {
  return (
    <RequireNotAuth>
      <div className={cx("register")}>
        <DefaultLayout>
          <div className={cx("container")}>
            <Grid container justifyContent={"center"}>
              <Grid item xs={12} sm={8} md={6}>
                <div className={cx("wrap")}>
                  <SignUpForm></SignUpForm>
                </div>
              </Grid>
            </Grid>
          </div>
        </DefaultLayout>
      </div>
    </RequireNotAuth>
  );
}

export default Register;
