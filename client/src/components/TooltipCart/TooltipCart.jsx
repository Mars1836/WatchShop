import React from "react";
import styles from "./tooltipCart.module.scss";
import classNames from "classnames/bind";
import products from "../../data/products";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Divider } from "@mui/material";
import Button from "../Button/Button";
import { makeStyles } from "@material-ui/styles";
import routes from "../../utils/configs/routes";

const cx = classNames.bind(styles);
function Cart() {
  const product1 = products[1];
  return (
    <div className={cx("cart")}>
      <div className={cx("top")}>
        <div className={cx("product")}>
          <div className={cx("image")}>
            <img src={product1.img} alt=""></img>
          </div>
          <div>
            <p className={cx("name")}>{product1.name}</p>
            <div>
              <span className={cx("num")}>1 x </span>
              <span className={cx("price")}>{product1.price}</span>
            </div>
          </div>
          <button className={cx("btn_remove")}>
            <HighlightOffIcon />
          </button>
        </div>
        <div className={cx("product")}>
          <div className={cx("image")}>
            <img src={product1.img} alt=""></img>
          </div>
          <div>
            <p className={cx("name")}>{product1.name}</p>
            <div>
              <span className={cx("num")}>1 x </span>
              <span className={cx("price")}>{product1.price}</span>
            </div>
          </div>
          <button className={cx("btn_remove")}>
            <HighlightOffIcon />
          </button>
        </div>
      </div>
      <Divider></Divider>
      <div className={cx("bottom")}>
        <div className={cx("head")}>
          <span className={cx("title")}>Sub-toltal: </span>
          <span className={cx("price")}>1000</span>
        </div>
        <div className={cx("action")}>
          <Button
            variant="outline"
            style={{
              width: "100%",
              textTransform: "uppercase",
              padding: "10px",
              fontWeight: 500,
              fontSize: "13px",
              background: "rgb(238,239,240)",
            }}
            to={routes.cart.path}
          >
            view cart
          </Button>
        </div>
      </div>
    </div>
  );
}
function TooltipCart({ children }) {
  const useStyles = makeStyles((theme) => ({
    arrow: {
      "&:before": {
        backgroundColor: "#fff",
        border: "2px solid #fff",
      },
      color: "#000",
    },
    tooltip: {
      backgroundColor: "#000",
      border: "1px solid #E6E8ED",
      boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.3)",
    },
  }));
  const classes = useStyles();
  console.log(classes);
  return (
    <Tooltip
      classes={{
        arrow: classes.arrow,
        tooltip: classes.tooltip,
      }}
      title={<Cart></Cart>}
      placement="bottom-start"
      arrow
    >
      {children}
    </Tooltip>
  );
}

export default TooltipCart;
