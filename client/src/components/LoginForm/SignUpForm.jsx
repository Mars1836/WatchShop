import React, { useState, useLayoutEffect } from "react"
import classNames from "classnames/bind"
import styles from "./loginForm.module.scss"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Button } from "@mui/material"
import { Divider } from "@mui/material"
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined"
import GoogleIcon from "@mui/icons-material/Google"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { actionUserApi } from "../../redux/actions/user"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import routes from "../../utils/configs/routes"
let schemaSignUp = yup.object().shape({
  name: yup.string().required(),
  username: yup
    .string()
    .required()

    .matches(
      "^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$",
      "Invalid username",
    ),
  password: yup
    .string()
    .required()
    .matches("^.{8,}$", "Minimum eight characters."),
  re_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords do not match"),
})
function SignUpForm({ setIsSignIn }) {
  const cx = classNames.bind(styles)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const dispatch = useDispatch()
  const signUp = useSelector(state => state.signUp)
  const navigate = useNavigate()
  const [signUpLoading, setSignUpLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignUp),
  })
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleClickShowRePassword = () => setShowRePassword(show => !show)
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSignUpSubmit = data => {
    setSignUpLoading(true)
    dispatch(actionUserApi.register(data, setIsSignIn))
      .then(data => {
        if (data.error) return
        setSignUpLoading(false)
        navigate(routes.login.path)
      })
      .catch(error => {
        console.log(error)
        setSignUpLoading(false)
      })
      .finally(() => {
        setSignUpLoading(false)
      })
  }
  return (
    <form className={cx("form")} onSubmit={handleSubmit(handleSignUpSubmit)}>
      <h3 className={cx("title")}>Sign up</h3>

      <TextField
        id='outlined-basic'
        label='Name'
        variant='outlined'
        className={cx("input")}
        {...register("name")}
        error={Boolean(errors.name?.message)}
        helperText={errors.name?.message}
      />

      <TextField
        id='outlined-basic'
        label='Username'
        variant='outlined'
        className={cx("input")}
        {...register("username")}
        error={Boolean(errors.username?.message)}
        helperText={errors.username?.message}
      />
      <TextField
        id='outlined-adornment-password'
        type={showPassword ? "text" : "password"}
        label={"Password"}
        {...register("password")}
        error={Boolean(errors.password?.message)}
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

      <TextField
        id='outlined-adornment-password'
        type={showRePassword ? "text" : "password"}
        label='Comfirm password'
        className={cx("input")}
        {...register("re_password")}
        error={Boolean(errors.re_password?.message)}
        helperText={errors.re_password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowRePassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showRePassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type='submit'
        className={cx("btn_submit")}
        variant='contained'
        style={{
          color: "white",
          alignSelf: "start",
        }}
        disabled={signUpLoading}
      >
        Submit
      </Button>
      <p>
        Đã tài khoản ?
        <Link
          style={{
            alignSelf: "start",
            color: "var(--orange-2)",
          }}
          to={routes.login.path}
        >
          Đăng nhập
        </Link>
      </p>
    </form>
  )
}

export default SignUpForm
