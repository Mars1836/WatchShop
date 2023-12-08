import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useFilterProducts from "../../../utils/hooks/filterProduct"
import mt from "../../../utils/obj/method_filter"
import classNames from "classnames/bind"
import styles from "./searchProductTooltip.module.scss"
import productRequest from "../../../requests/product"
import useAsyncData from "../../../utils/hooks/asyncData"
const cx = classNames.bind(styles)
function SearchedProductTooltip({ searchValue }) {
  const [productData, productError, productLoading] = useAsyncData(
    productRequest.getByQuery({ _findAll: 1 }),
  )
  const [filters, setFilters] = useState([
    {
      key: "name",
      value: searchValue,
      method: mt.in,
    },
  ])

  const productsFilter = useFilterProducts(productData, filters, 5)
  useEffect(() => {
    setFilters([
      {
        key: "name",
        value: searchValue,
        method: mt.in,
      },
    ])
  }, [searchValue])
  useEffect(() => {
    console.log(productsFilter)
  }, [productsFilter])
  return (
    <>
      <>
        {
          <div className={cx("searched_product_tooltip")}>
            {productsFilter?.map(item => {
              return (
                <div
                  key={item.id}
                  className={cx("searched_product_tooltip_item")}
                >
                  {item?.name}
                </div>
              )
            })}
          </div>
        }
      </>
    </>
  )
}

export default SearchedProductTooltip
