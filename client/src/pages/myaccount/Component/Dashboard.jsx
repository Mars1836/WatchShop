import React from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

function Dashboard() {
  return (
    <div>
      <h3 className={cx("title")}>Dashboard</h3>
      <div>
        From your account dashboard. you can easily check & view your recent
        orders, manage your shipping and billing addresses and edit your
        password and account details.
      </div>
    </div>
  );
}

export default Dashboard;
