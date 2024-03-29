import React, { useEffect, useState } from "react"
import Button from "../Button/Button"
import styles from "./productFeature.module.scss"
import classNames from "classnames/bind"
import ProductList from "../ProductList/ProductList"
import mt from "../../utils/obj/method_filter"
import useFilterProducts from "../../utils/hooks/filterProduct"
function ProductFeature({ products = [] }) {
  const cx = classNames.bind(styles)
  const [feature, setFeature] = useState()
  const features = [
    {
      text: "Sản phẩm phổ biến",
      filters: [
        {
          key: "categories",
          value: ["popular"],
          method: mt.in,
        },
      ],
      code: 1,
    },
    {
      text: "Sản phẩm khuyến mãi",
      code: 2,
      filters: [
        {
          key: "categories",
          value: ["sale"],
          method: mt.in,
        },
      ],
    },
    {
      text: "Sản phẩm mới",
      code: 3,
      filters: [
        {
          key: "categories",
          value: ["new"],
          method: mt.in,
        },
      ],
    },
  ]
  const filterProducts = useFilterProducts(products, feature?.filters)
  useEffect(() => {}, [feature])
  function handleClick(feature) {
    setFeature(feature)
  }
  return (
    <div className={cx("product_feature_cpn")}>
      <div className={cx("tab")}>
        {features.map((f, index) => {
          return (
            <Button
              variant={"text"}
              index={f.code}
              onClick={() => [handleClick(f)]}
              key={index}
              style={{
                paddingLeft: 0,
                paddingRight: 0,
                fontSize: "28px",
                fontWeight: 500,
                color: `${
                  feature?.code === f.code ? " var(--orange-2)" : "inherit"
                }`,
              }}
            >
              {f.text}
            </Button>
          )
        })}
      </div>
      <ProductList products={filterProducts}></ProductList>
    </div>
  )
}

export default ProductFeature
