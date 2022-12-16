import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { Breadcrumbs, Button, Grid, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "./maleWatches.scss";
import ProductList from "../../components/ProductList/ProductList";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";
function MaleWatches() {
  const theme = useTheme();
  const sm_matches = useMediaQuery(theme.breakpoints.up("sm"));
  const md_matches = useMediaQuery(theme.breakpoints.up("md"));
  const [columnProduct, setColumnProduct] = useState({ xs: 0, sm: 0, md: 0 });
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }
  useState(() => {}, []);
  return (
    <div className="male_watches_page">
      <DefaultLayout>
        <div className="contaner">
          <div className="top">
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                fontSize: "20px",
              }}
            >
              <Link underline="hover" color="inherit" to="/">
                TRANG CHỦ
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                ĐỒNG HỒ NAM
              </Link>
            </Breadcrumbs>
            <div className="filter_group">
              <Modal open={open} onClose={handleClose}>
                <div
                  style={{
                    width: "300px",
                    padding: "15px",
                    background: "#fff",
                    overflowY: "scroll",
                    height: "100vh",
                  }}
                >
                  <Sidebar></Sidebar>
                </div>
              </Modal>
              <p className="text pc">Hiển thị một kết quả duy nhất</p>
              <span
                className="filter_button n_pc"
                onClick={() => {
                  console.log("asdas");
                  setOpen(true);
                }}
              >
                <MenuIcon
                  sx={{ fontSize: "16px", marginRight: "6px" }}
                ></MenuIcon>
                LỌC
              </span>
              <select name="product_filter" className="product_filter">
                <option>Theo thứ tự mặc định</option>
                <option>Theo mức độ phổ biến</option>
                <option>Theo thứ tự điểm đánh giá</option>
                <option>Mới nhất</option>
                <option>Thứ tự theo giá: từ thấp đến cao</option>
                <option>Thứ tự theo giá: từ cao xuống thấp</option>
              </select>
            </div>
          </div>
          <div className="body">
            <Grid container spacing={4} className="product_wrapper">
              <Grid item xs={0} sm={0} md={3} className="pc">
                <Sidebar></Sidebar>
              </Grid>

              <Grid item xs={12} sm={12} md={9}>
                <ProductList
                  md={3}
                  sm={4}
                  className="male_watches_page_product_list"
                ></ProductList>
              </Grid>
            </Grid>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default MaleWatches;
