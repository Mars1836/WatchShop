import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { Breadcrumbs, Button, Grid, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./femalewatches.module.scss";
import ProductList from "../../components/ProductList/ProductList";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";
import classNames from "classnames/bind";
import mt from "../../utils/obj/method_filter";
import useFilterProducts from "../../utils/hooks/filterProduct";
import products from "../../data/products";
import { useSelector } from "react-redux";
function FemaleWatches() {
  const cx = classNames.bind(styles);
  const theme = useTheme();
  const products = useSelector((state) => state.product.data);

  const [filterSidebar, setFilterSidebar] = useState();
  const sm_matches = useMediaQuery(theme.breakpoints.up("sm"));
  const md_matches = useMediaQuery(theme.breakpoints.up("md"));
  const [columnProduct, setColumnProduct] = useState({ xs: 0, sm: 0, md: 0 });
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([
    {
      key: "gender",
      value: "female",
      method: mt.e,
    },
  ]);
  const womenWatchs = useFilterProducts(products, filters);
  const filterProduct = useFilterProducts(womenWatchs, filterSidebar);
  function handleClose() {
    setOpen(false);
  }
  function handleFilterSidebarChange(value) {
    setFilterSidebar(value);
  }
  return (
    <div className={cx("female_watches_page")}>
      <DefaultLayout>
        <div className={cx("contaner")}>
          <div className={cx("top")}>
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                fontSize: "20px",
                color: "var(--text-dart-1)",
              }}
            >
              <Link underline="hover" color="inherit" to="/">
                TRANG CH???
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                ?????NG H??? N???
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
              <p className={cx("text", "pc")}>Hi???n th??? m???t k???t qu??? duy nh???t</p>
              <span
                className={cx("filter_button", "n_pc")}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <MenuIcon
                  sx={{ fontSize: "16px", marginRight: "6px" }}
                ></MenuIcon>
                L???C
              </span>
              <select name="product_filter" className={cx("product_filter")}>
                <option>Theo th??? t??? m???c ?????nh</option>
                <option>Theo m???c ????? ph??? bi???n</option>
                <option>Theo th??? t??? ??i???m ????nh gi??</option>
                <option>M???i nh???t</option>
                <option>Th??? t??? theo gi??: t??? th???p ?????n cao</option>
                <option>Th??? t??? theo gi??: t??? cao xu???ng th???p</option>
              </select>
            </div>
          </div>
          <div className={cx("body")}>
            <Grid container spacing={4} className={cx("product_wrapper")}>
              <Grid item xs={0} sm={0} md={3} className="pc">
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
  );
}

export default FemaleWatches;
