import React from "react";
import Flickity from "react-flickity-component";
import "./customize.scss";
import "flickity/css/flickity.css";
import ProductCard from "../ProductCard/ProductCard";
import { Grid } from "@mui/material";
import styles from "./carousel.module.scss";
import classNames from "classnames/bind";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
function CarouselProduct({ products = [] }) {
  const [flickityOptions, setFlickityOptions] = useState({
    groupCells: 4,
    pageDots: false,
    cellAlign: "left",
  });
  const theme = useTheme();
  const matches_sm = useMediaQuery(theme.breakpoints.up("sm"));
  const matches_xs = useMediaQuery(theme.breakpoints.up("xs"));
  useEffect(() => {
    if (matches_sm) {
      setFlickityOptions((pre) => {
        return {
          ...pre,
          groupCells: 3,
        };
      });
      return;
    }
    if (matches_xs) {
      setFlickityOptions((pre) => {
        return {
          ...pre,
          groupCells: 2,
        };
      });
      return;
    }
    setFlickityOptions((pre) => {
      return {
        ...pre,
        groupCells: 4,
      };
    });
  }, [matches_sm, matches_xs]);
  const cx = classNames.bind(styles);

  return (
    <Flickity
      className={"carousel"} // default ''
      elementType={"div"} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
      {products.map((product) => {
        return (
          <div className={cx("card")} key={product.id}>
            <ProductCard product={product}></ProductCard>
          </div>
        );
      })}
    </Flickity>
  );
}

export default CarouselProduct;
