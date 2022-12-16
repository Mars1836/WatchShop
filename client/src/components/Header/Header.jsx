import React, { useRef } from "react";
import styles from "./header.module.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Divider from "@mui/material/Divider";
import Button from "../Button/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "../Modal/Modal";
import { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
function Header() {
  const cx = classNames.bind(styles);
  const theme = useTheme();
  const sm_matches = useMediaQuery(theme.breakpoints.up("sm"));
  const md_matches = useMediaQuery(theme.breakpoints.up("md"));
  const [headerMenuShow, setHeaderMenuShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [isShowBottomHeader, setIsShowBottomHeader] = useState(false);
  useEffect(() => {}, [sm_matches, md_matches]);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const bottom_header_pc = useRef();
  useEffect(() => {
    setHeaderMenuShow(open);
  }, [open]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsShowBottomHeader(!entry.isIntersecting);
        });
      },
      {
        rootMargin: "30px",
      }
    );
    if (bottom_header_pc.current) {
      observer.observe(bottom_header_pc.current);
    }
  });
  if (!md_matches) {
  }
  return (
    <>
      {md_matches ? (
        <div className={cx("header_pc")}>
          <div className={cx("top")}>
            <div className={cx("left")}>
              <div className={cx("infor")}>
                <LocationOnIcon className={cx("icon")}></LocationOnIcon>
                <p>319 - C16 Lý Thường Kiệt, P.15, Q.11, Tp.HCM</p>
              </div>
              <div className={cx("infor")}>
                <PhoneIcon className={cx("icon")}></PhoneIcon>
                <Button variant={"text"}>076 922 0162</Button>
              </div>
            </div>
            <div className={cx("right")}>
              <Button variant={"text"}>
                <FacebookIcon className={cx("icon")}></FacebookIcon>
              </Button>
              <Button variant={"text"}>
                <InstagramIcon className={cx("icon")}></InstagramIcon>
              </Button>
              <Button variant={"text"}>
                <TwitterIcon className={cx("icon")}></TwitterIcon>
              </Button>
            </div>
          </div>
          <Divider sx={{ background: "rgb(72,72,72)" }}></Divider>
          <div className={cx("center")}>
            <div className={cx("left")}>
              <div className={cx("logo")}>
                <Button variant={"none"} href="/">
                  <img
                    src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/logo-mona-2.png"
                    alt=""
                    className={cx("img")}
                  />
                </Button>
              </div>
            </div>
            <div className={cx("center")}>
              <div className={cx("wrap_form")}>
                <div className={cx("search_form")}>
                  <input
                    className={cx("search_input")}
                    placeholder="Tìm kiếm..."
                  ></input>
                  <Button
                    style={{
                      width: "70px",
                      borderBottomLeftRadius: "0px",
                      borderTopLeftRadius: "0px",
                    }}
                  >
                    <SearchIcon></SearchIcon>
                  </Button>
                </div>
              </div>
            </div>
            <div className={cx("right")}>
              <Button variant={"text"}>
                <FavoriteIcon></FavoriteIcon>
              </Button>
              <div className={cx("cart_icon")}>
                <div></div>
                <div className={cx("body")}>1</div>
              </div>
            </div>
          </div>
          <Divider sx={{ background: "rgb(72,72,72)" }}></Divider>

          <div className={cx("bottom")} ref={bottom_header_pc}>
            <ul className={cx("navigation")}>
              <li className={cx("item")}>
                <Button variant={"text-underline"} to="/">
                  TRANG CHỦ
                </Button>
              </li>
              <li className={cx("item")}>
                <Button variant={"text-underline"} to="/gioi-thieu">
                  GIỚI THIỆU
                </Button>
              </li>
              <li className={cx("item")}>
                <Button variant={"text-underline"} to="/dong-ho-nam">
                  ĐỒNG HỒ NAM
                </Button>
              </li>
              <li className={cx("item")}>
                <Button variant={"text-underline"} to="/">
                  ĐỒNG HỒ NỮ
                </Button>
              </li>
              <li className={cx("item")}>
                <Button variant={"text-underline"} to="/blog">
                  BLOGS
                </Button>
              </li>
              <li className={cx("item")}>
                <Button variant={"text-underline"} to="/">
                  LIÊN HỆ
                </Button>
              </li>
            </ul>
          </div>

          <div className={cx("bottom", "fixed", { hide: !isShowBottomHeader })}>
            <ul className={cx("navigation")}>
              <li className={cx("item")}>
                <Button variant={"text-underline"} to="/">
                  TRANG CHỦ
                </Button>
              </li>
              <li className={cx("item")}>
                <Button variant={"text-underline"} to="/gioi-thieu">
                  GIỚI THIỆU
                </Button>
              </li>
              <li className={cx("item")}>
                <Button variant={"text-underline"} to="/dong-ho-nam">
                  ĐỒNG HỒ NAM
                </Button>
              </li>
              <li className={cx("item")}>
                <Button variant={"text-underline"} to="/">
                  ĐỒNG HỒ NỮ
                </Button>
              </li>
              <li className={cx("item")}>
                <Button variant={"text-underline"} to="/blog">
                  BLOGS
                </Button>
              </li>
              <li className={cx("item")}>
                <Button variant={"text-underline"} to="/">
                  LIÊN HỆ
                </Button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div
          className={cx(`header_mobile`)}
          style={{
            right: `0px`,
          }}
        >
          <div className={cx("top")}>
            <div className={cx("right")}>
              <Button variant={"text"}>
                <FacebookIcon className={cx("icon")}></FacebookIcon>
              </Button>
              <Button variant={"text"}>
                <InstagramIcon className={cx("icon")}></InstagramIcon>
              </Button>
              <Button variant={"text"}>
                <TwitterIcon className={cx("icon")}></TwitterIcon>
              </Button>
            </div>
          </div>

          <div className={cx("main")}>
            <div className={cx("left")}>
              <div>
                <MenuIcon
                  className={cx("icon")}
                  onClick={handleOpen}
                ></MenuIcon>
              </div>
            </div>
            <div className={cx("center")}>
              <div className={cx("logo")}>
                <Button variant={"none"} href="/">
                  <img
                    src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/logo-mona-2.png"
                    alt=""
                    className={cx("img")}
                  />
                </Button>
              </div>
            </div>
            <div className={cx("right")}>
              <Button variant={"text"} style={{}}>
                <FavoriteIcon className={cx("icon")}></FavoriteIcon>
              </Button>
              <div className={cx("cart_icon")}>
                <div></div>
                <div className={cx("body")}>1</div>
              </div>
            </div>
          </div>
          <Modal open={open} onClose={handleClose}>
            {console.log("render iopen")}
            <div className={cx(`header_menu`, `${headerMenuShow && "show"}`)}>
              <div className={cx("input_group")}>
                <input placeholder="Tìm kiếm..."></input>
                <Button
                  variant={"contained"}
                  style={{ borderRadius: "0", padding: "4px 8px" }}
                >
                  <SearchIcon> </SearchIcon>
                </Button>
              </div>
              <ul className={cx("list")}>
                <li className={cx("item")}>
                  <Link to="/">TRANG CHỦ</Link>
                </li>
                <li className={cx("item")}>
                  <Link to="/gioi-thieu">GIỚI THIỆU</Link>
                </li>
                <li className={cx("item")}>
                  <Link to="/dong-ho-nam">ĐỒNG HỒ NAM</Link>
                </li>
                <li className={cx("item")}>
                  <Link to="/dong-ho-nu">ĐỒNG HỒ NỮ</Link>
                </li>
                <li className={cx("item")}>BLOGS</li>
                <li className={cx("item")}>LIÊN HỆ</li>
              </ul>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Header;
