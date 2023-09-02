import React, { useState, useLayoutEffect } from "react"
import classNames from "classnames/bind"
import styles from "./loginForm.module.scss"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import { Link } from "react-router-dom"
import InputAdornment from "@mui/material/InputAdornment"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Button, Divider } from "@mui/material"
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined"
import GoogleIcon from "@mui/icons-material/Google"
import { useDispatch } from "react-redux"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { actionUserApi } from "../../redux/actions/user"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import routes from "../../utils/configs/routes"

let schemaSignIn = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
})

function SignInForm() {
  const cx = classNames.bind(styles)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const userLoginLoading = useSelector(state => state.user.userLoginLoading)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignIn),
  })
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const resetValue = () => {
    reset()
  }
  const handleSignInSubmit = data => {
    dispatch(actionUserApi.localLogin(data))
  }
  const AuthWithGoogleOnSuccess = token => {
    dispatch(actionUserApi.googleLogin(token))
  }
  return (
    <form className={cx("form")} onSubmit={handleSubmit(handleSignInSubmit)}>
      <h3 className={cx("title")}>Sign in</h3>
      <TextField
        id='outlined-basic'
        label='Username'
        variant='outlined'
        className={cx("input")}
        {...register("username")}
        helperText={errors.username?.message}
        error={Boolean(errors.username?.message)}
      />

      <TextField
        id='outlined-adornment-password'
        type={showPassword ? "text" : "password"}
        {...register("password")}
        error={Boolean(errors.password?.message)}
        label={"Password"}
        helperText={errors.password?.message}
        className={cx("input")}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <span className={cx("fg_pas")}>For got password</span>
      <Button
        type='submit'
        className={cx("btn_submit")}
        variant='contained'
        style={{
          color: "white",
          alignSelf: "start",
        }}
        disabled={userLoginLoading}
      >
        Submit
      </Button>
      <div className={cx("bottom")}>
        <Divider sx={{ color: "gray", fontSize: "14px" }}>
          or sign in with:
        </Divider>
        <div className={cx("login_")}>
          <button
            className={cx("lg_w", "google")}
            onClick={() => {
              window.open("http://localhost:4000/api/google-login", "_self")
            }}
          >
            <GoogleIcon className={cx("icon")} />
          </button>
          <button className={cx("lg_w", "fb")}>
            <FacebookOutlinedIcon className={cx("icon")} />
          </button>
        </div>
      </div>
      <p>
        Chưa có tài khoản ?
        <Link
          to={routes.register.path}
          style={{
            alignSelf: "start",
            color: "var(--orange-2)",
          }}
        >
          Đăng ký
        </Link>
      </p>
    </form>
  )
}

export default SignInForm
