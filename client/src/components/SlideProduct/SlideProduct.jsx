import React, { useEffect } from "react";
import Button from "../Button/Button";
import "./slideProduct.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductCard from "../ProductCard/ProductCard";
import { useState } from "react";

function SlideProduct({ products, column = 4 }) {
  const limit = products.length / 4 - 1;
  const [slideStyle, setSlyleStyle] = useState({
    num: 0,
    isTransition: true,
  });
  const viewStyle = {
    transform: `translate(-${slideStyle.num * 100}%,0)`,
    transition: `${slideStyle.isTransition ? "all 0.5s linear" : "none"}`,
  };
  const itemStyle = {
    padding: "0 10px",
    flex: `0 0 ${25}%`,
  };
  function handleDragStart() {
    console.log("enter");
  }
  function handleDragEnd() {
    console.log("remove");
  }
  function slideToRight() {
    if (slideStyle.num >= limit) {
      return;
    }
    if (slideStyle.num + 1 < limit) {
      setSlyleStyle((slide) => {
        return { num: slide.num + 1, isTransition: true };
      });
      return;
    }
    setSlyleStyle((slide) => {
      return { num: slide.num + (limit % 1), isTransition: true };
    });
  }
  function slideToLeft() {
    if (slideStyle.num <= 0) {
      return;
    }
    if (slideStyle.num - 1 >= 0) {
      setSlyleStyle((slide) => {
        return { num: slide.num - 1, isTransition: true };
      });
      return;
    }
    setSlyleStyle((slide) => {
      return { num: slide.num - (slideStyle.num % 1), isTransition: true };
    });
  }
  useEffect(() => {
    console.log(slideStyle);
  }, [slideStyle]);
  return (
    <div className="slide_product">
      <div className="btn_slide">
        <div className="left">
          <Button
            variant="none"
            onClick={slideToLeft}
            style={{
              padding: "6px",
              color: `${slideStyle.num === 0 ? "gray" : "inherit"}`,
            }}
          >
            <ArrowBackIosNewIcon className="icon" />
          </Button>
        </div>
        <div className="right">
          <Button
            variant="none"
            onClick={slideToRight}
            style={{
              padding: "6px",
              color: `${slideStyle.num === limit ? "gray" : "inherit"}`,
            }}
          >
            <ArrowForwardIosIcon className="icon" />
          </Button>
        </div>
      </div>
      <div className="scene">
        <div
          className="view"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={viewStyle}
        >
          {products.map((product, index) => {
            return (
              <div className="item" style={itemStyle} key={index}>
                <ProductCard product={product}></ProductCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SlideProduct;
