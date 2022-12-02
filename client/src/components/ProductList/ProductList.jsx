import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import products from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";
import mt from "../../configs/const/method_filter";
function ProductList({ filters = [] }) {
  const [_products, set_products] = useState([]);
  useEffect(() => {
    console.log(filters);
    set_products(() => {
      return filters.reduce((productFilter, filter) => {
        return productFilter.filter((prd) => {
          switch (filter.method) {
            case mt.lt:
              return prd[filter.key] < filter.value;
            case mt.e:
              return prd[filter.key] === filter.value;
            case mt.mt:
              return prd[filter.key] > filter.value;
            case mt.lte:
              return prd[filter.key] <= filter.value;
            case mt.mte:
              return prd[filter.key] >= filter.value;
            case mt.exist:
              return prd[filter.key] && prd[filter.value];
            default:
              return true;
          }
        });
      }, products);
    });
  }, [filters]);

  return (
    <div className="product_list">
      <Grid container spacing={4}>
        {_products.map((prd, index) => {
          return (
            <Grid item xs={12} sm={8} md={2.4} key={index}>
              <ProductCard product={prd}></ProductCard>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default ProductList;
