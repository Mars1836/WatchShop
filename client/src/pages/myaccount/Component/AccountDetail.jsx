import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { actionUserApi } from "../../../redux/actions/user";
const schema = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string().nullable(),
  email: yup.string().nullable(),
});

const cx = classNames.bind(styles);

function AccountDetail({ user }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
  });

  function submitData(data) {
    dispatch(actionUserApi.updateProfile(data));
  }

  return (
    <div className={cx("account_detail")}>
      <h3 className={cx("title")}>AccountDetail</h3>
      <div className={cx("form")}>
        <form onSubmit={handleSubmit((d) => submitData(d))}>
          <div className={cx("input_group")}>
            <label htmlFor="name" className={cx("label")}>
              Name
            </label>

            <div className={cx("input_wrap")}>
              <input id="name" {...register("name")} />
              {errors.name && (
                <p className={cx("error_note")}> {errors.name.message}</p>
              )}
            </div>
          </div>
          <div className={cx("input_group")}>
            <label htmlFor="phone" className={cx("label")}>
              Phone
            </label>
            <div className={cx("input_wrap")}>
              <input id="phone" {...register("phone")} />
              {errors.phone && (
                <p className={cx("error_note")}>{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div className={cx("input_group")}>
            <label htmlFor="email" className={cx("label")}>
              Email
            </label>
            <div className={cx("input_wrap")}>
              <input id="email" {...register("email")} />
              {errors.email && (
                <p className={cx("error_note")}> {errors.email.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              color: "#fff",
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AccountDetail;
