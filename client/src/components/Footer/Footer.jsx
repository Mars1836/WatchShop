import { Grid } from "@mui/material";
import React from "react";
import Button from "../Button/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import EmailIcon from "@mui/icons-material/Email";
import { GrFacebookOption, GrInstagram, GrTwitter } from "react-icons/gr";
import { ImLinkedin, ImRss } from "react-icons/im";
import { AiFillSkype } from "react-icons/ai";
import "./footer.scss";
function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <div className="wrapper">
          <Grid container alignItems={"center"} justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <h3 className="title">ĐĂNG KÝ NHẬN THÔNG TIN</h3>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
              <div className="input_group">
                <input className="input_form"></input>
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
      <div className="bottom">
        <div className="container">
          <Grid
            container
            alignItems={"start"}
            justifyContent="center"
            spacing={4}
          >
            <Grid item xs={12} sm={3} md={3}>
              <div className="item">
                <div className="title">THÔNG TIN LIÊN HỆ</div>
                <ul className="list">
                  <li>
                    <LocationOnIcon className="icon"></LocationOnIcon>
                    <div className="val">
                      <p>319 C16 Lý Thường Kiệt, Phường 15, Quận 11, Tp.HCM</p>
                    </div>
                  </li>
                  <li>
                    <PhoneForwardedIcon className="icon"></PhoneForwardedIcon>
                    <div className="val">
                      <Button variant={"text"} style={{ fontSize: "16px" }}>
                        076 922 0162
                      </Button>
                    </div>
                  </li>
                  <li>
                    <EmailIcon className="icon"></EmailIcon>
                    <div className="val">
                      <Button variant={"text"} style={{ fontSize: "16px" }}>
                        demonhunterg@gmail.com
                      </Button>
                      <Button variant={"text"} style={{ fontSize: "16px" }}>
                        mon@mona.media
                      </Button>
                    </div>
                  </li>
                  <li>
                    <AiFillSkype className="icon"></AiFillSkype>
                    <div className="val">
                      <Button variant={"text"} style={{ fontSize: "16px" }}>
                        demonhunterp
                      </Button>
                    </div>
                  </li>
                  <li style={{ margin: "20px 0" }}>
                    <Grid container justifyContent={"center"} spacing={1}>
                      <Grid item flexBasis={40}>
                        <div
                          className="icon_fl"
                          style={{
                            backgroundColor: " rgb(58, 88, 157)",
                          }}
                        >
                          <GrFacebookOption className="icon"></GrFacebookOption>
                        </div>
                      </Grid>

                      <Grid item xs={3} sm={3} md={2.4}>
                        <div
                          className="icon_fl"
                          style={{
                            backgroundColor: "rgb(59,105,148)",
                          }}
                        >
                          <GrInstagram className="icon"></GrInstagram>
                        </div>
                      </Grid>
                      <Grid item xs={3} sm={3} md={2.4}>
                        <div
                          className="icon_fl"
                          style={{
                            backgroundColor: "rgb(36,120,186)",
                          }}
                        >
                          <GrTwitter className="icon"></GrTwitter>
                        </div>
                      </Grid>
                      <Grid item xs={3} sm={3} md={2.4}>
                        <div
                          className="icon_fl"
                          style={{
                            backgroundColor: "rgb(252,118,0)",
                          }}
                        >
                          <ImRss className="icon"></ImRss>
                        </div>
                      </Grid>
                      <Grid item xs={3} sm={3} md={2.4}>
                        <div
                          className="icon_fl"
                          style={{
                            backgroundColor: "rgb(0,114,183)",
                          }}
                        >
                          <ImLinkedin className="icon"></ImLinkedin>
                        </div>
                      </Grid>
                    </Grid>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={3}>
              <div className="item">
                <div className="title">LIÊN KẾT</div>
                <ul className="list l1">
                  <li>
                    <Button variant={"text"} style={{ fontSize: "16px" }}>
                      Giới thiệu
                    </Button>
                  </li>
                  <li>
                    <Button variant={"text"} style={{ fontSize: "16px" }}>
                      Đồng hồ nam
                    </Button>
                  </li>
                  <li>
                    <Button variant={"text"} style={{ fontSize: "16px" }}>
                      Đồng hồ nữ
                    </Button>
                  </li>
                  <li>
                    <Button variant={"text"} style={{ fontSize: "16px" }}>
                      Blogs
                    </Button>
                  </li>
                  <li>
                    <Button variant={"text"} style={{ fontSize: "16px" }}>
                      Liên hệ
                    </Button>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={3}>
              <div className="item">
                <div className="title">HỖ TRỢ</div>
                <ul className="list l2">
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
            <Grid item xs={12} sm={8} md={3}>
              <div className="item">
                <div className="title">TẢI ỨNG DỤNG TRÊN</div>
                <ul className="list l1">
                  <li>
                    Ứng dụng Mona Watch hiện có sẵn trên Google Play & App
                    Store. Tải nó ngay.
                  </li>
                  <li>
                    <img
                      src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-googleplay.jpg"
                      alt=""
                    />
                  </li>
                  <li>
                    <img
                      src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-appstore.jpg"
                      alt=""
                    />
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Footer;
