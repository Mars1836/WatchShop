import React from "react";
import styles from "./wishlist.module.scss";
import classNames from "classnames/bind";
import DefaultLayout from "../../layout/DefaultLayout";
import Button from "../../components/Button/Button";
import KeyboardBackspace from "@mui/icons-material/KeyboardBackspace";
import routes from "../../utils/configs/routes";
import { Grid } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductListVetical from "../../components/ProductListVetical/ProductListVetical";
import { default as productDatas } from "../../data/products";
import { useState } from "react";
import RequireAuth from "../../services/RequireAuth/RequireAuth";
import { useSelector } from "react-redux";
function Wishlist() {
  const cx = classNames.bind(styles);
  const [products, setProducts] = useState(productDatas);
  const wishlist = useSelector((state) => {
    return state.wishlist?.data
      ? state.wishlist?.data.map((item) => {
          return {
            ...item.product,
          };
        })
      : [];
  });

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
        <RequireAuth>
          <div className={cx("container")}>
            {!wishlist.length ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <p>Chưa có sản phẩm nào trong danh sách yêu thích.</p>
                <Button
                  to={routes.home.path}
                  variant="outline"
                  style={{
                    padding: "8px",
                    fontSize: "13px",
                    fontWeight: "500",
                    borderWidth: "2px",
                    borderColor: "var(--orange-1)",
                    color: "var(--orange-1)",
                    borderRadius: "0",
                    textTransform: "uppercase",
                  }}
                >
                  <KeyboardBackspace
                    sx={{ fontSize: "19px" }}
                  ></KeyboardBackspace>
                  Tiếp tục xem sản phẩm
                </Button>
              </div>
            ) : (
              <>
                <h1 className={cx("page_title")}>Danh sách yêu thích</h1>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={3} md={3} className="pc">
                    <Sidebar search blog></Sidebar>
                  </Grid>
                  <Grid item xs={12} sm={12} md={9}>
                    <ProductListVetical
                      products={wishlist}
                      onRemove={removeProduct}
                    ></ProductListVetical>
                  </Grid>
                </Grid>
              </>
            )}
          </div>
        </RequireAuth>
      </DefaultLayout>
    </div>
  );
}

export default Wishlist;
