import React from "react"
import styles from "./tooltipUser.module.scss"
import classNames from "classnames/bind"
import { useDispatch } from "react-redux"
import { actionUserApi } from "../../redux/actions/user"
import { useCookies } from "react-cookie"
import Button from "../Button/Button"
import routes from "../../utils/configs/routes"
import { Link } from "react-router-dom"
import instance from "../../utils/configs/instance"
import { userEndpoint } from "../../utils/configs/api"
const cx = classNames.bind(styles)
function TooltipUser() {
  const dispatch = useDispatch()
  const [cookies, setCookie, removeCookie] = useCookies(["token"])
  async function logout() {
    console.log("call function")
    let res = await instance.post(userEndpoint.logout)
    window.location.reload()
    // dispatch(actionUserApi.logout)
    // removeCookie("token")
  }
  return (
    <div className={cx("tooltip_user")}>
      <div className={cx("item")}>
        <Link to={routes.myAccount.path}>Tài khoản của tôi</Link>
      </div>
      <div className={cx("item")}>Đơn mua</div>
      <div className={cx("item")} onClick={logout}>
        Đăng xuất
      </div>
    </div>
  )
}

export default TooltipUser
