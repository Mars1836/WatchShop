import React, { useEffect, useState } from "react"
import classNames from "classnames/bind"
import styles from "./requireAuth.module.scss"
import Button from "../../components/Button/Button"
import { useSelector } from "react-redux"
import CircularProgress from "@mui/material/CircularProgress"

import routes from "../../utils/configs/routes"
const cx = classNames.bind(styles)
function RequireAuth({ children }) {
  const isAuth = useSelector(state => state.user.auth)
  const verifyLoading = useSelector(state => state.user.verifyLoading)
  useEffect(() => { }, [verifyLoading])
  return (
    <div>
      <>
        {verifyLoading ? (
          <div className={cx("loading")}>
            <CircularProgress
              sx={{
                color: "gray",
              }}
            />
          </div>
        ) : (
          <>
            {isAuth ? (
              <div>{children}</div>
            ) : (
              <div className={cx("wrapper")}>
                Bạn cần
                <Button
                  to={routes.login.path}
                  variant='text'
                  animate='none'
                  style={{
                    fontSize: "inherit",
                    color: "blue",
                    margin: "0 0.4rem",
                  }}
                >
                  đăng nhập
                </Button>
                trước.
              </div>
            )}
          </>
        )}
      </>
    </div>
  )
}

export default RequireAuth
