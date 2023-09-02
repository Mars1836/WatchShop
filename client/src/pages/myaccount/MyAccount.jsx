import React, { useState } from "react"
import DefaultLayout from "../../layout/DefaultLayout"
import RequireAuth from "../../services/RequireAuth/RequireAuth"
import classNames from "classnames/bind"
import styles from "./myAccount.module.scss"
import { Button, Grid } from "@mui/material"
import { useSelector } from "react-redux"
import Orders from "./Component/Orders"
import PurchaseOrder from "./Component/PurchaseOrder"
import Downloads from "./Component/Downloads"
import Addresses from "./Component/Addresses"
import AccountDetail from "./Component/AccountDetail"
import routes from "../../utils/configs/routes"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { actionUserApi } from "../../redux/actions/user"
import { useDispatch } from "react-redux"
import instance from "../../utils/configs/instance"
import { userEndpoint } from "../../utils/configs/api"
const cx = classNames.bind(styles)

function MyAccount() {
  const user = useSelector(state => state.user.data)
  const [option, setOption] = useState("purchase_order")
  const dispatch = useDispatch()
  const [cookies, setCookie, removeCookie] = useCookies(["token"])
  async function logout() {
    let res = await instance.post(userEndpoint.logout)

    removeCookie("token")
    window.location.reload()
  }
  const list = {
    purchase_order: <PurchaseOrder></PurchaseOrder>,
    orders: <Orders></Orders>,
    addresses: <Addresses user={user}></Addresses>,
    account_details: <AccountDetail user={user}></AccountDetail>,
  }
  function handleSetOption(op) {
    setOption(op)
  }
  return (
    <div className={cx("my_account_page")}>
      <DefaultLayout>
        <RequireAuth>
          <div className={cx("container")}>
            <div className={cx("intro")}>
              <div className={cx("item")}>
                <p>
                  Hello <b>{user?.name}</b>
                </p>
                <p>(not {user?.name}? Log Out)</p>
              </div>
              <div className={cx("item")}>
                <p>Need Assistance? Customer service at.</p>
                <p> admin@devitems.com.</p>
              </div>
              <div className={cx("item")}>
                <p> E-mail them at</p> <p>support@yoursite.com</p>
              </div>
              <div className={cx("item")}>
                <Link to={routes.cart.path}>
                  <Button
                    variant='contained'
                    style={{
                      fontSize: "12px",
                      padding: "4px 8px",
                      color: "#fff",
                    }}
                  >
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
            <div className={cx("purchase_order")}>
              <div className={cx("sidebar")}>
                <div
                  className={cx("item")}
                  onClick={() => {
                    handleSetOption("purchase_order")
                  }}
                >
                  Purchase Order
                </div>
                <div
                  className={cx("item")}
                  value='orders'
                  onClick={() => {
                    handleSetOption("orders")
                  }}
                >
                  Orders
                </div>

                <div
                  className={cx("item")}
                  onClick={() => {
                    handleSetOption("addresses")
                  }}
                >
                  Addresses
                </div>
                <div
                  className={cx("item")}
                  onClick={() => {
                    handleSetOption("account_details")
                  }}
                >
                  Account Details
                </div>
                <div className={cx("item")} onClick={logout}>
                  Logout
                </div>
              </div>
              <div className={cx("body")}>{list[option]}</div>
            </div>
          </div>
        </RequireAuth>
      </DefaultLayout>
    </div>
  )
}

export default MyAccount
