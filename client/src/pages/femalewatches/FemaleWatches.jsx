import React from "react"
import DefaultLayout from "../../layout/DefaultLayout"
import { Breadcrumbs, Button, Grid, useTheme } from "@mui/material"
import { Link } from "react-router-dom"
import styles from "./femalewatches.module.scss"
import ProductList from "../../components/ProductList/ProductList"
import { useMediaQuery } from "@mui/material"
import { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import Sidebar from "../../components/Sidebar/Sidebar"
import Modal from "../../components/Modal/Modal"
import classNames from "classnames/bind"
import mt from "../../utils/obj/method_filter"
import useFilterProducts from "../../utils/hooks/filterProduct"
import products from "../../data/products"
import { useSelector } from "react-redux"
import productRequest from "../../requests/product"
import useAsyncData from "../../utils/hooks/asyncData"
function FemaleWatches() {
  const cx = classNames.bind(styles)
  const theme = useTheme()
  const [productData, productError, productLoading] = useAsyncData(
    productRequest.getByQuery({ _findAll: 1 }),
  )
  const [filterSidebar, setFilterSidebar] = useState()
  const sm_matches = useMediaQuery(theme.breakpoints.up("sm"))
  const md_matches = useMediaQuery(theme.breakpoints.up("md"))
  const [columnProduct, setColumnProduct] = useState({ xs: 0, sm: 0, md: 0 })
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState([
    {
      key: "gender",
      value: "female",
      method: mt.e,
    },
  ])
  const womenWatchs = useFilterProducts(productData, filters)
  const filterProduct = useFilterProducts(womenWatchs, filterSidebar)
  function handleClose() {
    setOpen(false)
  }
  function handleFilterSidebarChange(value) {
    setFilterSidebar(value)
  }
  return (
    <div className={cx("female_watches_page")}>
      <DefaultLayout>
        <div className={cx("contaner")}>
          <div className={cx("top")}>
            <Breadcrumbs
              aria-label='breadcrumb'
              sx={{
                fontSize: "20px",
                color: "var(--text-dart-1)",
              }}
            >
              <Link underline='hover' color='inherit' to='/'>
                TRANG CHỦ
              </Link>
              <Link
                underline='hover'
                color='inherit'
                href='/material-ui/getting-started/installation/'
              >
                ĐỒNG HỒ NỮ
              </Link>
            </Breadcrumbs>
            <div className={cx("filter_group")}>
              <Modal open={open} onClose={handleClose}>
                <div className={cx("sidebar_mobile_wapper")}>
                  <Sidebar
                    search
                    product
                    product_tag
                    product_price
                    onFilterChange={handleFilterSidebarChange}
                  ></Sidebar>
                </div>
              </Modal>
              <p className={cx("text", "pc")}>Hiển thị một kết quả duy nhất</p>
              <span
                className={cx("filter_button", "n_pc")}
                onClick={() => {
                  setOpen(true)
                }}
              >
                <MenuIcon
                  sx={{ fontSize: "16px", marginRight: "6px" }}
                ></MenuIcon>
                LỌC
              </span>
              <select name='product_filter' className={cx("product_filter")}>
                <option>Theo thứ tự mặc định</option>
                <option>Theo mức độ phổ biến</option>
                <option>Theo thứ tự điểm đánh giá</option>
                <option>Mới nhất</option>
                <option>Thứ tự theo giá: từ thấp đến cao</option>
                <option>Thứ tự theo giá: từ cao xuống thấp</option>
              </select>
            </div>
          </div>
          <div className={cx("body")}>
            <Grid container spacing={4} className={cx("product_wrapper")}>
              <Grid item xs={0} sm={0} md={3} className='pc'>
                <Sidebar
                  search
                  product
                  product_tag
                  product_price
                  onFilterChange={handleFilterSidebarChange}
                ></Sidebar>
              </Grid>

              <Grid item xs={12} sm={12} md={9}>
                <ProductList
                  products={filterProduct}
                  md={3}
                  sm={4}
                  className={cx("female_watches_page_product_list")}
                ></ProductList>
              </Grid>
            </Grid>
          </div>
        </div>
      </DefaultLayout>
    </div>
  )
}

export default FemaleWatches
