import React, { useEffect } from "react";
import styles from "./tooltipCart.module.scss";
import classNames from "classnames/bind";
import products from "../../data/products";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Divider } from "@mui/material";
import Button from "../Button/Button";
import routes from "../../utils/configs/routes";
import { useSelector, useDispatch } from "react-redux";
import { actionCartApi } from "../../redux/actions/cart";
const cx = classNames.bind(styles);
function TooltipCart() {
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  function removeCartItem(cartItemId) {
    dispatch(actionCartApi.removeFromCart(cartItemId));
  }
  return (
    <div className={cx("cart")}>
      <div className={cx("top")}>
        {cart &&
          cart.cart_items.slice(-2).map((item) => {
            return (
              <div className={cx("product")} key={item.id}>
                <div className={cx("image")}>
                  <img src={item.product.img} alt=""></img>
                </div>
                <div>
                  <p className={cx("name")}>{item.product.name}</p>
                  <div>
                    <span className={cx("num")}>{item.quantity + " x"} </span>
                    <span className={cx("price")}>{item.product.price}</span>
                  </div>
                </div>
                <button
                  className={cx("btn_remove")}
                  onClick={() => {
                    removeCartItem(item.id);
                  }}
                >
                  <HighlightOffIcon />
                </button>
              </div>
            );
          })}
        -
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

export default TooltipCart;
