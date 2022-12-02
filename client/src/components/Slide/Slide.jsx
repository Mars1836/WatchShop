import React, { useEffect } from "react";
import "./slide.scss";
import Button from "../Button/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
function Slide() {
  const [slideStyle, setSlyleStyle] = useState({
    num: 0,
    isTransition: true,
  });

  const [slides, setSlides] = useState([
    {
      num: 0,
      backgroundImageURL:
        "url(http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/slide-bg-1.jpg)",
    },
    {
      num: 1,
      backgroundImageURL:
        "url(http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/slide-bg-2.jpg)",
    },
    {
      num: 2,
      backgroundImageURL:
        "url(http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/slide-bg-1.jpg)",
    },
  ]);

  function handleDragStart() {
    console.log("enter");
  }
  function handleDragEnd() {
    console.log("remove");
  }
  function slideToLeft() {
    if (slideStyle.num + 1 >= slides.length) {
      setSlyleStyle({
        num: 0,
        isTransition: false,
      });
      setTimeout(() => {
        setSlyleStyle((slide) => {
          return { num: slide.num + 1, isTransition: true };
        });
      }, 0);
      return;
    }
    setSlyleStyle((slide) => {
      return { num: slide.num + 1, isTransition: true };
    });
  }
  function slideToRight() {
    if (slideStyle.num - 1 < 0) {
      setSlyleStyle({
        num: slides.length - 1,
        isTransition: false,
      });
      setTimeout(() => {
        setSlyleStyle((slide) => {
          return { num: slide.num - 1, isTransition: true };
        });
      }, 0);
      return;
    }
    setSlyleStyle((slide) => {
      return { num: slide.num - 1, isTransition: true };
    });
  }

  return (
    <div className="slide">
      <div
        className="view"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          transform: `translate(-${slideStyle.num * 100}vw,0)`,
          transition: `${
            slideStyle.isTransition
              ? "all 0.8s cubic-bezier(0, 1, 0, 1)"
              : "none"
          }`,
        }}
      >
        {slides.map((slide, index) => {
          return (
            <div
              className="item"
              key={index}
              style={{
                backgroundImage: slide.backgroundImageURL,
              }}
            >
              <div
                className="content"
                style={
                  slide.num === slideStyle.num
                    ? { opacity: 1, transform: "translate(0, 0)" }
                    : {}
                }
              >
                <h4>Mona Watch</h4>
                <h1>Đồng hồ Classico</h1>
                <p>
                  Cùng với sự phát triển không ngừng của thời trang thế giới,
                  rất nhiều thương hiệu cho ra đời những mẫu đồng hồ nam chính
                  hãng đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ...
                </p>
                <Button
                  variant={"outline"}
                  style={{
                    color: "var(--text-light)",
                    padding: "10px 38px",
                  }}
                >
                  XEM SẢN PHẨM
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="btn_slide right">
        <Button
          type="circle"
          variant="outline"
          onClick={slideToRight}
          style={{
            width: "44px",
            height: "44px",
          }}
        >
          <ArrowBackIosNewIcon />
        </Button>
      </div>
      <div className="btn_slide left">
        <Button
          type="circle"
          variant="outline"
          onClick={slideToLeft}
          style={{
            width: "44px",
            height: "44px",
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
}

export default Slide;
