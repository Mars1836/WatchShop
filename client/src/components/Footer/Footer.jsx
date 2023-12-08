import { Divider, Grid } from "@mui/material"
import React from "react"
import Button from "../Button/Button"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded"
import EmailIcon from "@mui/icons-material/Email"
import { GrFacebookOption, GrInstagram, GrTwitter } from "react-icons/gr"
import { ImLinkedin, ImRss } from "react-icons/im"
import { AiFillSkype } from "react-icons/ai"
import styles from "./footer.module.scss"
import classNames from "classnames/bind"
import useCurrentPage from "../../utils/hooks/currentPage"
import routes from "../../utils/configs/routes"
function Footer() {
  const cx = classNames.bind(styles)
  const currentPage = useCurrentPage()
  return (
    <div className={cx("footer")}>
      <div className={cx("top")}>
        <div className={cx("wrapper")}>
          <Divider
            sx={{
              backgroundColor: "lightgray",
            }}
          ></Divider>
        </div>
        <div className={cx("wrapper")}>
          <Grid container alignItems={"center"} justifyContent='center'>
            <Grid item xs={12} sm={6} md={6}>
              <h3 className={cx("title")}>ĐĂNG KÝ NHẬN THÔNG TIN</h3>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div className={cx("input_group")}>
                <input
                  className={cx("input_form")}
                  placeholder='Email...'
                ></input>
                <Button
                  style={{
                    borderRadius: "0",
                    fontWeight: "500",
                    padding: "12px 22px",
                    fontSize: "18px",
                  }}
                >
                  ĐĂNG KÝ
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={cx("bottom")}>
        <div className={cx("container", "wrapper")}>
          <Grid
            container
            alignItems={"start"}
            justifyContent='center'
            spacing={4}
          >
            <Grid item xs={12} sm={6} md={3}>
              <div className={cx("item")}>
                <div className={cx("title")}>THÔNG TIN LIÊN HỆ</div>
                <ul className={cx("list")}>
                  <li>
                    <LocationOnIcon className={cx("icon")}></LocationOnIcon>
                    <div className={cx("val")}>
                      <p>319 C16 Lý Thường Kiệt, Phường 15, Quận 11, Tp.HCM</p>
                    </div>
                  </li>
                  <li>
                    <PhoneForwardedIcon
                      className={cx("icon")}
                    ></PhoneForwardedIcon>
                    <div className={cx("val")}>
                      <Button variant={"text"} style={{ fontSize: "16px" }}>
                        076 922 0162
                      </Button>
                    </div>
                  </li>
                  <li>
                    <EmailIcon className={cx("icon")}></EmailIcon>
                    <div className={cx("val")}>
                      <Button variant={"text"} style={{ fontSize: "16px" }}>
                        demonhunterg@gmail.com
                      </Button>
                      <Button variant={"text"} style={{ fontSize: "16px" }}>
                        mon@mona.media
                      </Button>
                    </div>
                  </li>
                  <li>
                    <AiFillSkype className={cx("icon")}></AiFillSkype>
                    <div className={cx("val")}>
                      <Button variant={"text"} style={{ fontSize: "16px" }}>
                        demonhunterp
                      </Button>
                    </div>
                  </li>
                  <li style={{ margin: "20px 0" }}>
                    <div
                      className={cx("item")}
                      style={{
                        border: "2px solid  rgb(58, 88, 157)",
                      }}
                    >
                      <div
                        className={cx("background")}
                        style={{
                          backgroundColor: " rgb(58, 88, 157)",
                        }}
                      ></div>
                      <GrFacebookOption
                        className={cx("icon")}
                      ></GrFacebookOption>
                    </div>

                    <div
                      className={cx("item")}
                      style={{
                        border: "2px solid  rgb(59,105,148)",
                      }}
                    >
                      <div
                        className={cx("background")}
                        style={{
                          backgroundColor: "rgb(59,105,148)",
                        }}
                      ></div>
                      <GrInstagram className={cx("icon")}></GrInstagram>
                    </div>

                    <div
                      className={cx("item")}
                      style={{
                        border: "2px solid  rgb(36,120,186)",
                      }}
                    >
                      <div
                        className={cx("background")}
                        style={{
                          backgroundColor: "rgb(36,120,186)",
                        }}
                      ></div>
                      <GrTwitter className={cx("icon")}></GrTwitter>
                    </div>

                    <div
                      className={cx("item")}
                      style={{
                        border: "2px solid  rgb(252,118,0)",
                      }}
                    >
                      <div
                        className={cx("background")}
                        style={{
                          backgroundColor: "rgb(252,118,0)",
                        }}
                      ></div>
                      <ImRss className={cx("icon")}></ImRss>
                    </div>

                    <div
                      className={cx("item")}
                      style={{
                        border: "2px solid  rgb(0,114,183)",
                      }}
                    >
                      <div
                        className={cx("background")}
                        style={{
                          backgroundColor: "rgb(0,114,183)",
                        }}
                      ></div>
                      <ImLinkedin className={cx("icon")}></ImLinkedin>
                    </div>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <div className={cx("item")}>
                <div className={cx("title")}>LIÊN KẾT</div>
                <ul className={cx("list", "l1")}>
                  <li>
                    <Button
                      variant={"text"}
                      style={{ fontSize: "16px" }}
                      className={cx({ active_btn: currentPage.introduce })}
                      to={routes.introduce.path}
                    >
                      Giới thiệu
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant={"text"}
                      style={{ fontSize: "16px" }}
                      className={cx({ active_btn: currentPage.maleWatches })}
                      to={routes.maleWatches.path}
                    >
                      Đồng hồ nam
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant={"text"}
                      style={{ fontSize: "16px" }}
                      className={cx({ active_btn: currentPage.femaleWatches })}
                      to={routes.femaleWatches.path}
                    >
                      Đồng hồ nữ
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant={"text"}
                      style={{ fontSize: "16px" }}
                      className={cx({ active_btn: currentPage.blog })}
                      to={routes.blog.path}
                    >
                      Blogs
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant={"text"}
                      style={{ fontSize: "16px" }}
                      className={cx({ active_btn: currentPage.contact })}
                      to={routes.contact.path}
                    >
                      Liên hệ
                    </Button>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <div className={cx("item")}>
                <div className={cx("title")}>HỖ TRỢ</div>
                <ul className={cx("list", "l2")}>
                  <li>
                    <Button variant={"text"} style={{ fontSize: "16px" }}>
                      Hướng dẫn mua hàng
                    </Button>
                  </li>
                  <li>
                    <Button variant={"text"} style={{ fontSize: "16px" }}>
                      Hướng dẫn thanh toán
                    </Button>
                  </li>
                  <li>
                    <Button variant={"text"} style={{ fontSize: "16px" }}>
                      Chính sách bảo hành
                    </Button>
                  </li>
                  <li>
                    <Button variant={"text"} style={{ fontSize: "16px" }}>
                      Chính sách đổi trả
                    </Button>
                  </li>
                  <li>
                    <Button variant={"text"} style={{ fontSize: "16px" }}>
                      Tư vấn khách hàng
                    </Button>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <div className={cx("item")}>
                <div className={cx("title")}>TẢI ỨNG DỤNG TRÊN</div>
                <ul className={cx("list", "l1")}>
                  <li>
                    Ứng dụng Mona Watch hiện có sẵn trên Google Play & App
                    Store. Tải nó ngay.
                  </li>
                  <li>
                    <img
                      src='http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-googleplay.jpg'
                      alt=''
                    />
                  </li>
                  <li>
                    <img
                      src='http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-appstore.jpg'
                      alt=''
                    />
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default Footer
