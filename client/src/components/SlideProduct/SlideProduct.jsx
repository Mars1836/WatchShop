import React, { useEffect, forwardRef } from "react";
import Button from "../Button/Button";
import styles from "./slideProduct.module.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductCard from "../ProductCard/ProductCard";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Draggable from "../Draggable/Draggable";
import { useRef } from "react";
import classNames from "classnames/bind";
const SlideProduct = forwardRef(({ products }, ref) => {
  const cx = classNames.bind(styles);
  const theme = useTheme();
  const sm_matches = useMediaQuery(theme.breakpoints.up("sm"));
  const md_matches = useMediaQuery(theme.breakpoints.up("md"));
  const [column, setColumn] = useState(2);
  const [limit, setLimit] = useState(products.length / column - 1);
  const view = useRef();
  useEffect(() => {
    if (md_matches) {
      setColumn(4);
      return;
    }
    if (sm_matches) {
      setColumn(3);
      return;
    }
    setColumn(2);
  }, [sm_matches, md_matches]);
  useEffect(() => {
    setLimit(products.length / column - 1);
  }, [column]);
  const [slideStyle, setSlideStyle] = useState({
    num: 0.25,
    isTransition: true,
    isRender: true,
  });
  const [viewStyle, setViewStyle] = useState({
    transform: `translate(-${slideStyle.num * 100}%,0)`,
    transition: `${slideStyle.isTransition ? "all 0.5s linear" : "none"}`,
  });
  const itemStyle = {
    padding: "0 10px",
    flex: `0 0 ${100 / column}%`,
  };

  function slideToRight() {
    if (slideStyle.num >= limit) {
      return;
    }
    if (slideStyle.num + 1 <= limit) {
      setSlideStyle((slide) => {
        return { num: slide.num + 1, isTransition: true, isRender: true };
      });
      return;
    }
    setSlideStyle((slide) => {
      return {
        num: limit,
        isTransition: true,
        isRender: true,
      };
    });
  }
  function slideToLeft() {
    if (slideStyle.num <= 0) {
      return;
    }
    if (slideStyle.num - 1 >= 0) {
      setSlideStyle((slide) => {
        return { num: slide.num - 1, isTransition: true, isRender: true };
      });
      return;
    }
    setSlideStyle((slide) => {
      return {
        num: slide.num - (slideStyle.num % 1),
        isTransition: true,
        isRender: true,
      };
    });
  }
  useEffect(() => {
    if (!slideStyle.isRender) {
      return;
    }
    setViewStyle({
      transform: `translate(-${slideStyle.num * 100}%,0)`,
      transition: `${slideStyle.isTransition ? "all 0.5s linear" : "none"}`,
    });
  }, [slideStyle]);
  useEffect(() => {}, [slideStyle]);
  return (
    <div className={cx("slide_product")}>
      <div className={cx("btn_slide", "left")}>
        <Button
          variant="none"
          onClick={slideToLeft}
          style={{
            padding: "6px",
            color: `${slideStyle.num === 0 ? "gray" : "inherit"}`,
          }}
        >
          <ArrowBackIosNewIcon className={cx("icon")} />
        </Button>
      </div>
      <div className={cx("btn_slide", "right")}>
        <Button
          variant="none"
          onClick={slideToRight}
          style={{
            padding: "6px",
            color: `${slideStyle.num === limit ? "gray" : "inherit"}`,
          }}
        >
          <ArrowForwardIosIcon className={cx("icon")} />
        </Button>
      </div>
      <div className={cx("scene")}>
        <Draggable
          slots={column}
          quantity={products.length}
          num={slideStyle.num}
          setNum={(num) => {
            setSlideStyle({
              num: num,
              isTransition: true,
              isRender: true,
            });
          }}
        >
          {(child) => {
            return (
              <div className={cx("view")} style={viewStyle} ref={child}>
                {products.map((product, index) => {
                  return (
                    <div className={cx("item")} style={itemStyle} key={index}>
                      <ProductCard product={product}></ProductCard>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Draggable>
      </div>
    </div>
  );
});
export default SlideProduct;
