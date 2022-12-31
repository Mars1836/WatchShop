import React from "react";
import classNames from "classnames/bind";
import styles from "./contact.module.scss";
import DefaultLayout from "../../layout/DefaultLayout";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Grid } from "@mui/material";
import Button from "../../components/Button/Button";
import MailIcon from "@mui/icons-material/Mail";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
function Contact() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("contact_page")}>
      <DefaultLayout>
        <div className={cx("container")}>
          <div className={cx("map")}></div>
          <div className={cx("infor")}>
            <Grid container spacing={4}>
              <Grid item xm={12} sm={6} md={4}>
                <div className={cx("item")}>
                  <div className={cx("left")}>
                    <LocationOnIcon className={cx("icon")} />
                  </div>
                  <div className={cx("right")}>
                    <h3 className={cx("title")}>Địa chỉ:</h3>
                    <p>319</p>
                    <p>C16 Lý Thường Kiệt, Phường 15, Quận 11, Tp.HCM</p>
                  </div>
                </div>
              </Grid>
              <Grid item xm={12} sm={6} md={4}>
                <div className={cx("item")}>
                  <div className={cx("left")}>
                    <PhoneForwardedIcon className={cx("icon")} />
                  </div>
                  <div className={cx("right")}>
                    <h3 className={cx("title")}>Điện thoại:</h3>
                    <Button
                      variant={"text"}
                      style={{
                        color: "var(--text-dark)",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      1900 636 648
                    </Button>
                    <p>Bấm 109 – Phòng kinh doanh</p>
                    <p>Bấm 103 – Phòng kỹ thuật</p>
                  </div>
                </div>
              </Grid>
              <Grid item xm={12} sm={6} md={4}>
                <div className={cx("item")}>
                  <div className={cx("left")}>
                    <MailIcon className={cx("icon")} />
                  </div>
                  <div className={cx("right")}>
                    <h3 className={cx("title")}>Email:</h3>
                    <Button
                      variant={"text"}
                      style={{
                        color: "rgb(97,97,97)",
                        fontSize: "16px",
                      }}
                    >
                      demonhunterg@gmail.com
                    </Button>
                    <Button
                      variant={"text"}
                      style={{
                        color: "rgb(97,97,97)",
                        fontSize: "16px",
                      }}
                    >
                      mon@mona.media
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={cx("form_contact")}>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                  <input
                    className={cx("input_form")}
                    placeholder="Họ và tên"
                  ></input>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <input
                    className={cx("input_form")}
                    placeholder="Email"
                  ></input>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <input
                    className={cx("input_form")}
                    placeholder="Số điện thoại"
                  ></input>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <input
                    className={cx("input_form")}
                    placeholder="Địa chỉ"
                  ></input>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <textarea
                    className={cx("input_form")}
                    placeholder="Địa chỉ"
                    style={{
                      minHeight: "200px",
                      resize: "vertical",
                    }}
                  ></textarea>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <input
                    type="submit"
                    value="Gửi"
                    className={cx("btn_submit")}
                  />
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default Contact;
