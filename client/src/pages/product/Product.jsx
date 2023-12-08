import React from "react"
import classNames from "classnames/bind"
import styles from "./product.module.scss"
import DefaultLayout from "../../layout/DefaultLayout"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Divider, Grid } from "@mui/material"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Button from "../../components/Button/Button"
import bankLogos from "../../assets/banks"
import deliverLogos from "../../assets/delivers"
import Modal from "../../components/Modal/Modal"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import formatDate from "../../utils/function/formatDate"
import { Rating } from "@mui/material"
import CarouselProduct from "../../components/CarouselProduct/CarouselProduct"
import { useRef } from "react"
import { actionCartApi } from "../../redux/actions/cart"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import instance from "../../utils/configs/instance"
import { feedbackEndpoint } from "../../utils/configs/api"
import Feedback from "./component/Feedback"
import handlePriceDiscount from "../../utils/function/handlePriceDiscount"
import productRequest from "../../requests/product"
import useAsyncData from "../../utils/hooks/asyncData"
function Product() {
  const [num, setNum] = useState(1)
  const [logoModalOpen, setLogoModalOpen] = useState(false)
  const [tabs, setTabs] = useState(0)
  const [productStar, setProductStar] = useState(0)
  const [quantityFeedback, setQuantityFeedback] = useState(0)
  const description = useRef()
  const params = useParams()
  const [productItemData, productItemError, productItemLoading] = useAsyncData(
    productRequest.getByQuery({ id: params.id, _detail: 1 }),
  )
  useEffect(() => {
    console.log(productItemData?.id)
  }, [productItemData])
  const [imageModal, setImageModal] = useState({
    images: [...deliverLogos, ...bankLogos],
    index: 0,
  })
  const dispatch = useDispatch()
  const isAuth = useSelector(state => {
    return state.user.auth
  })
  const handleRequireAuth = () => {
    if (isAuth) {
      return false
    }
    toast.warning("Bạn cần đăng nhập trước!!!")
    return true
  }
  function handleAddToCart(productId, quantity) {
    const payload = { productId, quantity }
    dispatch(actionCartApi.addToCart(payload))
  }

  const cx = classNames.bind(styles)

  function handleIncreaseNum() {
    setNum(num + 1)
  }
  function handleDecreaseNum() {
    if (num > 1) {
      setNum(num - 1)
    }
    return
  }
  function handleLogoModelOpen() {
    setLogoModalOpen(true)
  }
  function handleLogoModelClose() {
    setLogoModalOpen(false)
  }
  function handleCurrentImageLogo(index) {
    setImageModal(pre => {
      return {
        ...pre,
        index: index,
      }
    })
  }

  function moveRightLogo() {
    if (imageModal.index >= imageModal.images.length - 1) {
      setImageModal(pre => {
        return {
          ...pre,
          index: 0,
        }
      })
      return
    }
    setImageModal(pre => {
      return {
        ...pre,
        index: pre.index + 1,
      }
    })
  }
  function moveLeftLogo() {
    if (imageModal.index <= 0) {
      setImageModal(pre => {
        return {
          ...pre,
          index: pre.images.length,
        }
      })
      return
    }
    setImageModal(pre => {
      return {
        ...pre,
        index: pre.index - 1,
      }
    })
  }
  return (
    <div className={cx("product_page")}>
      <DefaultLayout>
        {productItemData ? (
          <div className={cx("container")}>
            <div className={cx("main")}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6} md={6}>
                  <div className={cx("image_list")}>
                    <div className={cx("cur_image")}>
                      <img src={`${productItemData.img}`} alt=''></img>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className={cx("detail")}>
                    <Breadcrumbs
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      <Link to='/' className={cx("link")}>
                        TRANG CHỦ
                      </Link>
                      <Link to='/san-pham' className={cx("link")}>
                        SẢN PHẨM
                      </Link>
                    </Breadcrumbs>
                    <h2 className={cx("name")}>{productItemData.name}</h2>
                    <div className={cx("star_rate")}>
                      <Rating
                        name='half-rating'
                        value={productStar}
                        precision={0.5}
                        readOnly
                      />
                      <p
                        className={cx("link_to_review")}
                        onClick={() => {
                          window.scrollTo({
                            top: description.current.offsetTop - 60,
                            behavior: "smooth",
                          })
                          setTabs(1)
                        }}
                      >
                        ({quantityFeedback} Đánh giá)
                      </p>
                    </div>
                    <div className={cx("line")}></div>
                    <div className={cx("price_wrapper")}>
                      {!!productItemData.discount && (
                        <div className={cx("price", "origin_price")}>
                          {productItemData.price}
                        </div>
                      )}
                      <div className={cx("price", "sale_price")}>
                        {handlePriceDiscount(productItemData)}
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nam fringilla augue nec est tristique auctor. Donec non
                      est at libero vulputate rutrum. Morbi ornare lectus quis
                      justo gravida semper. Nulla tellus mi, vulputate
                      adipiscing cursus eu, suscipit id nulla.
                    </p>
                    <ul className={cx("features")}>
                      <li>
                        Categories:{" "}
                        {productItemData.categories.map((item, index) => {
                          if (index !== 0) return ", " + item.value
                          return item.value
                        })}
                      </li>
                      <li>
                        Tag:
                        {productItemData.tags.map((item, index) => {
                          if (index !== 0) return ", " + item.value
                          return item.value
                        })}
                      </li>
                    </ul>
                    <div className={cx("action")}>
                      <div className={cx("count")}>
                        <button onClick={handleDecreaseNum} disabled={num <= 1}>
                          -
                        </button>
                        <div className={cx("num")}>{num}</div>
                        <button onClick={handleIncreaseNum}>+</button>
                      </div>
                      <Button
                        className={cx("")}
                        style={{
                          background: "var(--orange-2)",
                          borderRadius: "0px",
                          padding: "11px 22px",
                          fontWeight: 500,
                        }}
                        variant='contained'
                        onClick={() => {
                          if (!handleRequireAuth()) {
                            handleAddToCart(productItemData.id, num)
                          }
                        }}
                      >
                        THÊM VÀO GIỎ
                      </Button>
                    </div>
                    <div className={cx("pay_list")}>
                      <Modal
                        open={logoModalOpen}
                        onClose={handleLogoModelClose}
                        position='center'
                      >
                        <>
                          <div
                            className={cx("logo_image")}
                            onClick={moveRightLogo}
                          >
                            <img
                              src={`${imageModal.images[imageModal.index]}`}
                              alt=''
                            ></img>
                            <span className={cx("bottom")}>
                              {`${imageModal.index + 1} of ${
                                imageModal.images.length
                              }`}
                            </span>
                          </div>

                          <button
                            className={cx("btn_modal", "btn_left")}
                            onClick={moveLeftLogo}
                          >
                            <ArrowBackIosNewIcon
                              className={cx("icon")}
                            ></ArrowBackIosNewIcon>
                          </button>
                          <button
                            className={cx("btn_modal", "btn_right")}
                            onClick={moveRightLogo}
                          >
                            <ArrowForwardIosIcon
                              className={cx("icon")}
                            ></ArrowForwardIosIcon>
                          </button>
                        </>
                      </Modal>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={6}>
                          <div className={cx("item")}>
                            <h4 className={cx("title")}>
                              Tính phí ship tự động
                            </h4>
                            <div className={cx("list_image")}>
                              {deliverLogos.map((url, index) => {
                                return (
                                  <div
                                    className={cx("image_wrapper")}
                                    key={index}
                                  >
                                    <img
                                      src={url}
                                      alt=''
                                      onClick={() => {
                                        handleCurrentImageLogo(index)
                                        handleLogoModelOpen()
                                      }}
                                    ></img>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <div className={cx("item")}>
                            <h4 className={cx("title")}>Thanh toán</h4>
                            <div className={cx("list_image")}>
                              {bankLogos.map((url, index) => {
                                return (
                                  <div
                                    className={cx("image_wrapper")}
                                    key={index}
                                  >
                                    <img
                                      src={url}
                                      alt=''
                                      key={index}
                                      onClick={() => {
                                        handleCurrentImageLogo(index + 6)
                                        handleLogoModelOpen()
                                      }}
                                    ></img>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <div className={cx("btm")}>
                      <p className={cx("btn")}>Thêm yêu thích</p>
                      <p className={cx("text")}>
                        {"Mã: " + productItemData.id}
                      </p>
                      <p className={cx("text")}>
                        {"Danh mục: " + productItemData.id}
                      </p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
            <Divider></Divider>
            <div className={cx("description")} ref={description}>
              <div className={cx("tabs")}>
                <button
                  className={cx("btn", { active: tabs === 0 })}
                  onClick={() => {
                    setTabs(0)
                  }}
                >
                  Mô tả
                </button>
                <button
                  className={cx("btn", { active: tabs === 1 })}
                  onClick={() => {
                    setTabs(1)
                  }}
                >
                  Đánh giá
                </button>
              </div>
              <div className={cx("content")}>
                <div
                  className={cx("detail")}
                  style={tabs === 0 ? {} : { display: "none" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  fringilla augue nec est tristique auctor. Donec non est at
                  libero vulputate rutrum. Morbi ornare lectus quis justo
                  gravida semper. Nulla tellus mi, vulputate adipiscing cursus
                  eu, suscipit id nulla. Pellentesque aliquet, sem eget laoreet
                  ultrices, ipsum metus feugiat sem, quis fermentum turpis eros
                  eget velit. Donec ac tempus ante. Fusce ultricies massa massa.
                  Fusce aliquam, purus eget sagittis vulputate, sapien libero
                  hendrerit est, sed commodo augue nisi non neque. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem
                  et placerat vestibulum, metus nisi posuere nisl, in accumsan
                  elit odio quis mi. Cras neque metus, consequat et blandit et,
                  luctus a nunc. Etiam gravida vehicula tellus, in imperdiet
                  ligula euismod eget.
                </div>
                <Feedback
                  tabs={tabs}
                  productId={productItemData.id}
                  handleProductStar={setProductStar}
                  handleQuantityFeedback={setQuantityFeedback}
                ></Feedback>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </DefaultLayout>
    </div>
  )
}

export default Product
