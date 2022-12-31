import React, { useRef } from "react";
import styles from "./productListVetical.scss";
import classNames from "classnames/bind";
import ProductItem from "../ProductItem/ProductItem";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
function ProductListVetical({ products, onRemove }) {
  const cx = classNames.bind(styles);
  const product_list = useRef();
  const num = 4;
  const [page, setPage] = useState(1);
  const count = Math.ceil(products.length / num);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    return () => {
      if (product_list.current)
        window.scrollTo({
          top: product_list.current.offsetTop - 80,
          behavior: "smooth",
        });
    };
  }, [page]);
  return (
    <div className={cx("product_list_vetical_cpn")}>
      <div className={cx("product_list")} ref={product_list}>
        {products.slice((page - 1) * num, page * num).map((product) => {
          return (
            <ProductItem
              product={product}
              key={product.id}
              onRemove={onRemove}
            ></ProductItem>
          );
        })}
      </div>
      <div className={cx("pagination")}>
        <Pagination
          count={count}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default ProductListVetical;
