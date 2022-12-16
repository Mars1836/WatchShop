import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./home.module.scss";
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
import { useRef } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import classNames from "classnames/bind";

function Home() {
  const cx = classNames.bind(styles);
  const theme = useTheme();
  const sm_matches = useMediaQuery(theme.breakpoints.up("sm"));
  const md_matches = useMediaQuery(theme.breakpoints.up("md"));
  const [productData, setProduceData] = useState(products);
  const trend = useRef();
  const product_list = useRef();
  const banner = useRef();
  const product_feature = useRef();
  const blogcard = useRef();
  console.log(styles);
  useEffect(() => {}, [sm_matches, md_matches]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(cx("hide"), !entry.isIntersecting);
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(trend.current);
    observer.observe(product_list.current);
    observer.observe(banner.current);
    observer.observe(product_feature.current);
    observer.observe(blogcard.current);
  }, []);
  return (
    <div className={cx("home")}>
      <DefaultLayout>
        <div className={cx("body")}>
          <Slide></Slide>
          <div className={cx("trend")} ref={trend}>
            <Grid container spacing={4} justifyContent="space-between">
              <Grid item xs={12} sm={6} md={6}>
                <Thumbnail img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-1.jpg">
                  <div className={cx("content")}>
                    <h4>Xu hướng 2019</h4>
                    <div className={cx("line")}></div>
                    <h1>ĐỒNG HỒ NAM</h1>
                  </div>
                </Thumbnail>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Thumbnail img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-2.jpg">
                  <div className={cx("content")}>
                    <h4>Xu hướng 2019</h4>
                    <div className={cx("line")}></div>
                    <h1>ĐỒNG HỒ NỮ</h1>
                  </div>
                </Thumbnail>
              </Grid>
            </Grid>
          </div>
          <div className={cx("product_list")} ref={product_list}>
            <h2 className={cx("title")}>Tất cả sản phầm</h2>
            <SlideProduct products={productData}></SlideProduct>
          </div>
          <div className={cx("banner")} ref={banner}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} className={cx("item")}>
                <Thumbnail
                  img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/banner-04.jpg"
                  position="bottom right 10%"
                >
                  <div className={cx("content", "st1")}>
                    <h1 className={cx("title")}>CỔ ĐIỂN</h1>
                    <h3 className={cx("desc")}>
                      Đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…
                    </h3>
                  </div>
                </Thumbnail>
              </Grid>
              <Grid item xs={12} sm={6} md={6} className={cx("item")}>
                <Thumbnail
                  img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/banner-03.jpg"
                  position="top right 10%"
                >
                  <div className={cx("content", "st2")}>
                    <h1 className={cx("title")}>SMART WATCH</h1>
                    <h3 className={cx("desc")}>
                      Đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…
                    </h3>
                  </div>
                </Thumbnail>
              </Grid>
            </Grid>
          </div>
          <div
            className={cx("wrapper", "product_feature")}
            ref={product_feature}
          >
            <ProductFeature></ProductFeature>
          </div>
          <div className={cx("wrapper", "blogcard")} ref={blogcard}>
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
        </div>
      </DefaultLayout>
    </div>
  );
}

export default Home;
