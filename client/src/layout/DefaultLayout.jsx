import React, { useEffect, useLayoutEffect } from "react"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import styles from "./defaultLayout.scss"
import classNames from "classnames/bind"
import { useLocation } from "react-router-dom"
import ScrollUpButton from "../components/ScrollUpButton/ScrollUpButton"
import SupportChat from "../components/SupportChat/SupportChat"
function DefaultLayout({ children }) {
  const cx = classNames.bind(styles)
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    })
  }, [location.pathname])
  return (
    <>
      <Header></Header>
      <div className={cx("body_page")}>{children}</div>
      <ScrollUpButton></ScrollUpButton>
      <SupportChat></SupportChat>
      <Footer></Footer>
    </>
  )
}

export default DefaultLayout
