import React from "react";
import styles from "./productItem.module.scss";
import classNames from "classnames/bind";
import { Rating } from "@mui/material";
import Button from "../Button/Button";
import DialogConfirm from "../../components/DialogConfirm/DialogConfirm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionWishListApi } from "../../redux/actions/wishlist";
import { actionCartApi } from "../../redux/actions/cart";
function ProductItem({ product }) {
  const cx = classNames.bind(styles);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleClickRemove = () => {
    setOpenDialog(true);
  };
  function handleAddToCart(productId) {
    dispatch(actionCartApi.addToCart(productId));
  }
  return (
    <div className={cx("product_item_cpn")}>
      <DialogConfirm
        open={openDialog}
        onClose={handleCloseDialog}
        onYes={() => {
          dispatch(actionWishListApi.toggleWishList(product.id));
        }}
      ></DialogConfirm>
      <div className={cx("image")}>
        <img src={product.img} alt=""></img>
      </div>
      <div className={cx("description")}>
        <h2 className={cx("name")}>{product.name}</h2>
        <h3 className={cx("price")}>{product.price + "₫"}</h3>
        <div className={cx("star_rate")}>
          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            readOnly
          />
        </div>
        <p className={cx("detail")}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          suscipit aliquam, dignissimos nesciunt, quos voluptas tenetur
          necessitatibus voluptate vitae quo quibusdam nihil.
        </p>
      </div>
      <div className={cx("action")}>
        <p>{`Mã: ${product.id}`}</p>
        <p>{`Trạng thát: Còn hàng`}</p>
        <Button
          variant={"contained"}
          style={{
            marginTop: "6px",
            padding: "10px 20px",
          }}
          onClick={() => {
            handleAddToCart(product.id);
          }}
        >
          Add to card
        </Button>
        <button
          className={cx("btn_remove")}
          onClick={() => {
            handleClickRemove();
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
export default ProductItem;
