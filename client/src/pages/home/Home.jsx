import React, { useEffect, useState, useLayoutEffect } from "react";
import styles from "./home.module.scss";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Slide from "../../components/Slide/Slide";
import SlideProduct from "../../components/SlideProduct/SlideProduct";
import ProductFeature from "../../components/ProductFeature/ProductFeature";
import Thumbnail from "../../components/Thumnail/Thumbnail";
import { useRef } from "react";
import classNames from "classnames/bind";
import DefaultLayout from "../../layout/DefaultLayout";
import blogs from "../../data/blogs";
import BlogCard from "../../components/BlogCard/BlogCard";
import CarouselProduct from "../../components/CarouselProduct/CarouselProduct";
import { useSelector } from "react-redux";

function Home() {
  const cx = classNames.bind(styles);
  const theme = useTheme();
  const products = useSelector((state) => state.product.data);
  const sm_matches = useMediaQuery(theme.breakpoints.up("sm"));
  const md_matches = useMediaQuery(theme.breakpoints.up("md"));
  const trend = useRef();
  const product_list = useRef();
  const banner = useRef();
  const product_feature = useRef();
  const blogcard = useRef();

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
      { threshold: 0 }
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
                <div className={cx("curvededge")}>
                  <Thumbnail img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-1.jpg">
                    <div className={cx("content")}>
                      <h4>Xu h?????ng 2019</h4>
                      <div className={cx("line")}></div>
                      <h1>?????NG H??? NAM</h1>
                    </div>
                  </Thumbnail>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className={cx("curvededge")}>
                  <Thumbnail img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-2.jpg">
                    <div className={cx("content")}>
                      <h4>Xu h?????ng 2019</h4>
                      <div className={cx("line")}></div>
                      <h1>?????NG H??? N???</h1>
                    </div>
                  </Thumbnail>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={cx("product_list")} ref={product_list}>
            <h2 className={cx("title")}>T???t c??? s???n ph???m</h2>
            <CarouselProduct products={products}></CarouselProduct>
          </div>
          <div className={cx("banner")} ref={banner}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} className={cx("item")}>
                <div className={cx("curvededge")}>
                  <Thumbnail
                    img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/banner-04.jpg"
                    position="bottom right 10%"
                  >
                    <div className={cx("content", "st1")}>
                      <h1 className={cx("title")}>C??? ??I???N</h1>
                      <h3 className={cx("desc")}>
                        ??a d???ng v??? phong c??ch, ki???u d??ng, m??u s???c, k??ch c??????
                      </h3>
                    </div>
                  </Thumbnail>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} className={cx("item")}>
                <div className={cx("curvededge")}>
                  <Thumbnail
                    img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/banner-03.jpg"
                    position="top right 10%"
                  >
                    <div className={cx("content", "st2")}>
                      <h1 className={cx("title")}>SMART WATCH</h1>
                      <h3 className={cx("desc")}>
                        ??a d???ng v??? phong c??ch, ki???u d??ng, m??u s???c, k??ch c??????
                      </h3>
                    </div>
                  </Thumbnail>
                </div>
              </Grid>
            </Grid>
          </div>
          <div
            className={cx("wrapper", "product_feature")}
            ref={product_feature}
          >
            <ProductFeature products={products}></ProductFeature>
          </div>
          <div className={cx("wrapper", "blogcard")} ref={blogcard}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <BlogCard blog={blogs[0]} card={false}></BlogCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <BlogCard blog={blogs[1]} card={false}></BlogCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <BlogCard blog={blogs[2]} card={false}></BlogCard>
              </Grid>
            </Grid>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default Home;
