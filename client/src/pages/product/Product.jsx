import React from "react";
import classNames from "classnames/bind";
import styles from "./product.module.scss";
import DefaultLayout from "../../layout/DefaultLayout";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "../../data/products";
import { Divider, Grid } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "../../components/Button/Button";
import bankLogos from "../../assets/banks";
import deliverLogos from "../../assets/delivers";
import Modal from "../../components/Modal/Modal";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import formatDate from "../../utils/function/formatDate";
import { Rating } from "@mui/material";
import CarouselProduct from "../../components/CarouselProduct/CarouselProduct";
import { useRef } from "react";
import { actionCartApi } from "../../redux/actions/cart";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
function Product() {
  const [product, setProduct] = useState();
  const [num, setNum] = useState(0);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [tabs, setTabs] = useState(0);
  const [starNumber, setStarNumber] = useState(0);
  const description = useRef();
  const params = useParams();
  const [imageModal, setImageModal] = useState({
    images: [...deliverLogos, ...bankLogos],
    index: 0,
  });
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => {
    return state.user.auth;
  });
  const handleRequireAuth = () => {
    if (isAuth) {
      return false;
    }
    toast.warning("Bạn cần đăng nhập trước!!!");
    return true;
  };
  function handleAddToCart(productId) {
    dispatch(actionCartApi.addToCart(productId));
  }
  useEffect(() => {
    const item = products.find((pr) => {
      return pr.id === params.id;
    });
    console.log(item);
    setProduct(item);
  }, [params.id]);
  useEffect(() => {
    console.log(starNumber);
  }, [starNumber]);
  const cx = classNames.bind(styles);

  function handleIncreaseNum() {
    setNum(num + 1);
  }
  function handleDecreaseNum() {
    if (num > 0) {
      setNum(num - 1);
    }
    return;
  }
  function handleLogoModelOpen() {
    setLogoModalOpen(true);
  }
  function handleLogoModelClose() {
    setLogoModalOpen(false);
  }
  function handleCurrentImageLogo(index) {
    setImageModal((pre) => {
      return {
        ...pre,
        index: index,
      };
    });
  }
  function moveRightLogo() {
    if (imageModal.index >= imageModal.images.length - 1) {
      setImageModal((pre) => {
        return {
          ...pre,
          index: 0,
        };
      });
      return;
    }
    setImageModal((pre) => {
      return {
        ...pre,
        index: pre.index + 1,
      };
    });
  }
  function moveLeftLogo() {
    if (imageModal.index <= 0) {
      setImageModal((pre) => {
        return {
          ...pre,
          index: pre.images.length,
        };
      });
      return;
    }
    setImageModal((pre) => {
      return {
        ...pre,
        index: pre.index - 1,
      };
    });
  }
  return (
    <div className={cx("product_page")}>
      <DefaultLayout>
        {product ? (
          <div className={cx("container")}>
            <div className={cx("main")}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6} md={6}>
                  <div className={cx("image_list")}>
                    <div className={cx("cur_image")}>
                      <img src={`${product.img}`} alt=""></img>
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
                      <Link to="/" className={cx("link")}>
                        TRANG CHỦ
                      </Link>
                      <Link to="/BEST SELLER" className={cx("link")}>
                        BEST SELLER
                      </Link>
                    </Breadcrumbs>
                    <h2 className={cx("name")}>{product.name}</h2>
                    <div className={cx("star_rate")}>
                      <Rating
                        name="half-rating"
                        defaultValue={2.5}
                        precision={0.5}
                        readOnly
                      />
                      <p
                        className={cx("link_to_review")}
                        onClick={() => {
                          window.scrollTo({
                            top: description.current.offsetTop - 60,
                            behavior: "smooth",
                          });
                          setTabs(1);
                        }}
                      >
                        (2 Đánh giá)
                      </p>
                    </div>
                    <div className={cx("line")}></div>
                    <h3 className={cx("price")}>{product.price + "₫"} </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nam fringilla augue nec est tristique auctor. Donec non
                      est at libero vulputate rutrum. Morbi ornare lectus quis
                      justo gravida semper. Nulla tellus mi, vulputate
                      adipiscing cursus eu, suscipit id nulla.
                    </p>
                    <ul className={cx("features")}>
                      <li>Sku: P006</li>
                      <li>Categories: Butter & Eggs, Cultured Butter</li>
                      <li>Tag: Man</li>
                    </ul>
                    <div className={cx("action")}>
                      <div className={cx("count")}>
                        <button onClick={handleDecreaseNum}>-</button>
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
                        variant="contained"
                        onClick={() => {
                          if (!handleRequireAuth()) {
                            handleAddToCart(product.id);
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
                        position="center"
                      >
                        <>
                          <div
                            className={cx("logo_image")}
                            onClick={moveRightLogo}
                          >
                            <img
                              src={`${imageModal.images[imageModal.index]}`}
                              alt=""
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
                                      alt=""
                                      onClick={() => {
                                        handleCurrentImageLogo(index);
                                        handleLogoModelOpen();
                                      }}
                                    ></img>
                                  </div>
                                );
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
                                      alt=""
                                      key={index}
                                      onClick={() => {
                                        handleCurrentImageLogo(index + 6);
                                        handleLogoModelOpen();
                                      }}
                                    ></img>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <div className={cx("btm")}>
                      <p className={cx("btn")}>Thêm yêu thích</p>
                      <p className={cx("text")}>{"Mã: " + product.id}</p>
                      <p className={cx("text")}>{"Danh mục: " + product.id}</p>
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
                    setTabs(0);
                  }}
                >
                  Mô tả
                </button>
                <button
                  className={cx("btn", { active: tabs === 1 })}
                  onClick={() => {
                    setTabs(1);
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
                <div
                  className={cx("feedback")}
                  id="feedback"
                  style={tabs === 1 ? {} : { display: "none" }}
                >
                  <div className={cx("comment_list")}>
                    <div className={cx("comment")}>
                      <div
                        style={{
                          backgroundImage: `url('https://demo.hasthemes.com/ruiz-preview/ruiz/assets/images/other/reviewer-60x60.jpg')`,
                        }}
                        className={cx("avatar")}
                      ></div>
                      <div className={cx("wrapper")}>
                        <p className={cx("name")}>hauvu</p>
                        <div className={cx("star_rate")}>
                          <Rating
                            name="half-rating"
                            defaultValue={2.5}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                        <div className={cx("timestamp")}>
                          {formatDate(new Date())}
                        </div>
                        <div className={cx("comment_content")}>
                          Sản phẩm này siêu pro luôn
                        </div>
                      </div>
                    </div>
                    <div className={cx("comment")}>
                      <div
                        style={{
                          backgroundImage: `url('https://demo.hasthemes.com/ruiz-preview/ruiz/assets/images/other/reviewer-60x60.jpg')`,
                        }}
                        className={cx("avatar")}
                      ></div>
                      <div className={cx("wrapper")}>
                        <p className={cx("name")}>hauvu</p>
                        <div className={cx("star_rate")}>
                          <Rating
                            name="half-rating"
                            defaultValue={2.5}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                        <div className={cx("timestamp")}>
                          {formatDate(new Date())}
                        </div>
                        <div className={cx("comment_content")}>
                          Sản phẩm này siêu pro luôn
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("feedback_form")}>
                    <div className={cx("form_rating")}>
                      <p className={cx("title")}>Đánh giá của bạn</p>
                      <div className={cx("star_rate")}>
                        <Rating
                          name="simple-controlled"
                          value={starNumber}
                          onChange={(event, newValue) => {
                            setStarNumber(newValue);
                          }}
                        />
                      </div>

                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12}>
                          <label className={cx("title")} htmlFor="comment">
                            Nhận xét của bạn
                          </label>
                          <textarea
                            className={cx("input")}
                            id="comment"
                          ></textarea>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <label
                            className={cx("title")}
                            htmlFor="name"
                            name="name"
                          >
                            Tên
                          </label>
                          <input className={cx("input")} id="name"></input>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <label
                            className={cx("title")}
                            htmlFor="email"
                            name="email"
                          >
                            Email
                          </label>
                          <input className={cx("input")} id="email"></input>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Button
                            type={"submit"}
                            className={cx("btn_submit")}
                            variant={"contained"}
                            animate="none"
                          >
                            Gửi
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("other_product")}>
              <CarouselProduct></CarouselProduct>
            </div>
          </div>
        ) : (
          <></>
        )}
      </DefaultLayout>
    </div>
  );
}

export default Product;
