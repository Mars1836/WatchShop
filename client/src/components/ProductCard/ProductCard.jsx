import React, { useState } from "react";
import styles from "./ProductCard.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { actionCartApi } from "../../redux/actions/cart";
import { useDispatch } from "react-redux";
import useIsInWishList from "../../utils/hooks/isInWishList";
import { actionWishListApi } from "../../redux/actions/wishlist";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import Button from "../Button/Button";
function ProductCard({ product }) {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const isInWishList = useIsInWishList(product.id);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const isAuth = useSelector((state) => {
    return state.user.auth;
  });
  const handleRequireAuth = () => {
    if (isAuth) {
      return false;
    }
    toast.warning("Bạn cần đăng nhập trước!!!");
    return true;
  };
  function handleAddToCart(productId) {
    setAddToCartLoading(true);
    dispatch(actionCartApi.addToCart(productId)).then(() => {
      setAddToCartLoading(false);
    });
  }
  function handleToggleWishlist() {
    dispatch(actionWishListApi.toggleWishList(product.id));
  }
  return (
    <div className={cx("product_card")} draggable={false}>
      <div className={cx("product_head")}>
        {!!product.discount && (
          <div className={cx("ribbon")}>
            <span className={cx("ribbon4")}>
              <span>Giảm {product.discount}%</span>
            </span>
          </div>
        )}
        <Link className={cx("name_product")} to={`/san-pham/${product.id}`}>
          <img src={product.img} alt="" draggable={false} />
        </Link>

        <button
          className={cx("like_btn", { active: isInWishList })}
          onClick={handleToggleWishlist}
        >
          <FavoriteIcon className={cx("icon")} />
        </button>
      </div>
      <div className={cx("product_infor")}>
        <Link className={cx("name_product")} to={`/san-pham/${product.id}`}>
          {product.name}
        </Link>
        <p className={cx("price_product")}>
          {product.price + " "}
          <span>₫</span>
        </p>
        <Button
          style={{
            borderRadius: 0,
            padding: "12px 10px",
            fontWeight: "500",
            width: "100%",
          }}
          variant="contained"
          onClick={() => {
            if (!handleRequireAuth()) {
              handleAddToCart(product.id);
            }
          }}
          disabled={addToCartLoading}
        >
          Add to cart
          {addToCartLoading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
                color: "black",
              }}
            />
          )}
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
