import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./home.scss";
import { Grid, Box, useMediaQuery, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Slide from "../../components/Slide/Slide";
import ProductCard from "../../components/ProductCard/ProductCard";
import products from "../../data/products";
import SlideProduct from "../../components/SlideProduct/SlideProduct";
import Button from "../../components/Button/Button";
import ProductFeature from "../../components/ProductFeature/ProductFeature";
import BlogCard from "../../components/BlogCard/BlogCard";
import Thumbnail from "../../components/Thumnail/Thumbnail";
import Footer from "../../components/Footer/Footer";
function Home() {
  const theme = useTheme();
  const sm_matches = useMediaQuery(theme.breakpoints.up("sm"));
  const md_matches = useMediaQuery(theme.breakpoints.up("md"));
  const [productData, setProduceData] = useState(products);
  console.log(productData);
  const style_trend_item_1 = {
    backgroundImage: `url(http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-1.jpg)`,
  };
  const style_trend_item_2 = {
    backgroundImage: `url(http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-2.jpg)`,
  };
  return (
    <div className="home">
      <Header></Header>
      <div className="body">
        <Slide></Slide>
        <div className="trend">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} sm={6} md={6}>
              <Thumbnail img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-1.jpg">
                <div className="content">
                  <h4>Xu hướng 2019</h4>
                  <div className="line"></div>
                  <h1>ĐỒNG HỒ NAM</h1>
                </div>
              </Thumbnail>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Thumbnail img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-2.jpg">
                <div className="content">
                  <h4>Xu hướng 2019</h4>
                  <div className="line"></div>
                  <h1>ĐỒNG HỒ NỮ</h1>
                </div>
              </Thumbnail>
            </Grid>
          </Grid>
        </div>
        <div className="product_list">
          <h2 className="title">Tất cả sản phầm</h2>
          <SlideProduct products={productData}></SlideProduct>
        </div>
        <div className="banner">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Thumbnail
                img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/banner-04.jpg"
                position="bottom right 10%"
              >
                <div className="content st1">
                  <h1 className="title">CỔ ĐIỂN</h1>
                  <h3 className="desc">
                    Đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…
                  </h3>
                </div>
              </Thumbnail>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Thumbnail
                img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/banner-03.jpg"
                position="top right 10%"
              >
                <div className="content st2">
                  <h1 className="title">SMART WATCH</h1>
                  <h3 className="desc">
                    Đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…
                  </h3>
                </div>
              </Thumbnail>
            </Grid>
          </Grid>
        </div>
        <div className="wrapper">
          <ProductFeature></ProductFeature>
        </div>
        <div className="wrapper">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <BlogCard></BlogCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <BlogCard></BlogCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <BlogCard></BlogCard>
            </Grid>
          </Grid>
        </div>
        <div className="wrapper">
          <Divider
            sx={{
              backgroundColor: "lightgray",
            }}
          ></Divider>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
