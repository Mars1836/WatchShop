import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import classNames from "classnames/bind";
import styles from "./notfound.module.scss";
import { Link } from "react-router-dom";

function Notfound() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("notfound_page")}>
      <DefaultLayout>
        <div className={cx("container")}>
          <h1>404</h1>
          <h2>PAGE NOT BE FOUND</h2>
          <p>
            Sorry but the page you are looking for does not exist, have been
            removed, name changed or is temporarity unavailable.
          </p>
          <Link to="/">back to home page</Link>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default Notfound;
