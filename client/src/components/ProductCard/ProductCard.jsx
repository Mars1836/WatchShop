import React from "react";
import Button from "../Button/Button";
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
function ProductCard({ product }) {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const isInWishList = useIsInWishList(product.id);
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
    dispatch(actionCartApi.addToCart(productId));
  }
  function handleToggleWishlist() {
    dispatch(actionWishListApi.toggleWishList(product.id));
  }
  return (
    <div className={cx("product_card")} draggable={false}>
      <div className={cx("product_head")}>
        <Link className={cx("name_product")} to={`/san-pham/${product.id}`}>
          <img src={product.img} alt="" draggable={false} />
        </Link>
        {!!product.discount && (
          <div className={cx("sale")}>-{product.discount}%</div>
        )}
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
            padding: "6px 10px",
            fontWeight: "500",
            width: "90%",
            maxWidth: "120px",
          }}
          variant="contained"
          onClick={() => {
            if (!handleRequireAuth()) {
              console.log("hahdhahsdhashdh");
              handleAddToCart(product.id);
            }
          }}
        >
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
