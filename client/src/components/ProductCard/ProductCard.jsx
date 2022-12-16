import React from "react";
import Button from "../Button/Button";
import styles from "./ProductCard.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import classNames from "classnames/bind";
function ProductCard({ product }) {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("product_card")} draggable={false}>
      <div className={cx("product_head")}>
        <img src={product.img} alt="" draggable={false} />
        {!!product.discount && (
          <div className={cx("sale")}>-{product.discount}%</div>
        )}
        <button className={cx("like_btn")}>
          <FavoriteIcon />
        </button>
      </div>
      <div className={cx("product_infor")}>
        <p className={cx("name_product")}>{product.name}</p>
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
        >
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
