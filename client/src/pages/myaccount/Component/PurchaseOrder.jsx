import React from "react"
import classNames from "classnames/bind"
import styles from "./styles.module.scss"
const cx = classNames.bind(styles)

function PurchaseOrder() {
  return (
    <div>
      <h3 className={cx("title")}>Purchase order</h3>
      <div></div>
    </div>
  )
}

export default PurchaseOrder
