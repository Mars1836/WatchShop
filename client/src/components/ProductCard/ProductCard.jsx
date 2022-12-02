import React from "react";
import Button from "../Button/Button";
import "./ProductCard.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
function ProductCard({ product }) {
  return (
    <div className="product_card">
      <div className="product_head">
        <img src={product.img} alt="" />
        {!!product.discount && <div className="sale">-{product.discount}%</div>}
        <button className="like_btn">
          <FavoriteIcon />
        </button>
      </div>
      <div className="product_infor">
        <p className="name_product">{product.name}</p>
        <p className="price_product">
          {product.price + " "}
          <span>₫</span>
        </p>
        <Button
          style={{
            borderRadius: 0,
            padding: "6px 10px",
            fontWeight: "500",
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
