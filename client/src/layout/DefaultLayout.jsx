import React, { Children } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "./defaultLayout.scss";
import classNames from "classnames/bind";

function DefaultLayout({ children }) {
  const cx = classNames.bind(styles);
  return (
    <>
      <Header></Header>
      <div className={cx("body_page")}>{children}</div>
      <Footer></Footer>
    </>
  );
}

export default DefaultLayout;
