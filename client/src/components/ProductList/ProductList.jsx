import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import products from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";
import mt from "../../utils/obj/method_filter";
import Loading from "../Loading/Loading";
function ProductList({ products, orders = [], sm, md, className, onRemove }) {
  return (
    <>
      {products ? (
        <div className={`product_list ${className}`}>
          <Grid container spacing={4}>
            {products.map((prd, index) => {
              return (
                <Grid
                  item
                  xs={6}
                  sm={sm ? sm : 4}
                  md={md ? md : 2.4}
                  key={index}
                >
                  <ProductCard product={prd}></ProductCard>
                </Grid>
              );
            })}
          </Grid>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}

export default ProductList;
