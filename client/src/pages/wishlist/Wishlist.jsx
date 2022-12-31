import React from "react";
import styles from "./wishlist.module.scss";
import classNames from "classnames/bind";
import DefaultLayout from "../../layout/DefaultLayout";

import { Grid } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductListVetical from "../../components/ProductListVetical/ProductListVetical";
import { default as productDatas } from "../../data/products";
import { useState } from "react";
import DialogConfirm from "../../components/DialogConfirm/DialogConfirm";

function Wishlist() {
  const cx = classNames.bind(styles);
  const [products, setProducts] = useState(productDatas);

  const removeProduct = (id) => {
    const index = products.findIndex((product) => {
      return id === product.id;
    });
    const newArr = Array.from(products);
    newArr.splice(index, 1);
    setProducts(newArr);
  };

  return (
    <div className={cx("wishlist_page")}>
      <DefaultLayout>
        <div className={cx("container")}>
          <h1 className={cx("page_title")}>Danh sách yêu thích</h1>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={3} md={3} className="pc">
              <Sidebar search product_tag blog></Sidebar>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <ProductListVetical
                products={products}
                onRemove={removeProduct}
              ></ProductListVetical>
            </Grid>
          </Grid>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default Wishlist;
