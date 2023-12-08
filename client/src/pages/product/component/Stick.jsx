import React, { useRef, useState, useMemo } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./stick.scss"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
function Stick({ data = [] }) {
  const sliderRef = useRef(null)
  const [images, setImages] = useState(data)
  const [slideIndex, setSlideIndex] = useState()
  const [isShowSlide, setIsShowSlide] = useState(false)
  const handleSliderChange = num => {
    setIsShowSlide(true)

    sliderRef.current.slickGoTo(num)
  }
  const handleSliderNext = () => {
    sliderRef.current.slickNext()
  }
  const handleSliderPrevious = () => {
    sliderRef.current.slickPrev()
  }

  const settings = useMemo(() => {
    return {
      infinite: true,
      speed: isShowSlide ? 300 : 0,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      // variableWidth: true,
      beforeChange: (current, next) => {
        setSlideIndex(next)
      },
    }
  }, [isShowSlide])
  return (
    <div>
      <div className='stick_img_btn_wrapper'>
        {!!images?.length &&
          images.map((item, index) => {
            return (
              <div
                className='stick_img_btn_item'
                key={item.public_id}
                onClick={() => {
                  handleSliderChange(index)
                }}
              >
                <img
                  style={
                    index === slideIndex
                      ? { padding: "3px", border: "2px solid #c8b944" }
                      : {}
                  }
                  src={item.url}
                  alt=''
                />
              </div>
            )
          })}
      </div>
      <div
        className='stick_wrapper'
        style={
          isShowSlide
            ? {
                width: "600px",
              }
            : { display: "none" }
        }
      >
        <Slider {...settings} ref={sliderRef}>
          {images.map(item => {
            return (
              <div className='stick_item' key={item.id}>
                <img
                  src={item.url}
                  alt=''
                  style={{
                    maxWidth: "600px",
                    maxHeight: "600px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )
          })}
        </Slider>
        <div className='arrow' style={{ textAlign: "center" }}>
          <button className='button left' onClick={handleSliderPrevious}>
            <KeyboardArrowLeftIcon />
          </button>
          <button className='button right' onClick={handleSliderNext}>
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Stick
