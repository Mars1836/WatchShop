import React from "react";
import "./header.scss";
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
function Header() {
  return (
    <div className="header">
      <div className="top">
        <div className="left">
          <div className="infor">
            <LocationOnIcon className="icon"></LocationOnIcon>
            <p>319 - C16 Lý Thường Kiệt, P.15, Q.11, Tp.HCM</p>
          </div>
          <div className="infor">
            <PhoneIcon className="icon"></PhoneIcon>
            <Button variant={"text"}>076 922 0162</Button>
          </div>
        </div>
        <div className="right">
          <Button variant={"text"}>
            <FacebookIcon className="icon"></FacebookIcon>
          </Button>
          <Button variant={"text"}>
            <InstagramIcon className="icon"></InstagramIcon>
          </Button>
          <Button variant={"text"}>
            <TwitterIcon className="icon"></TwitterIcon>
          </Button>
        </div>
      </div>
      <Divider sx={{ background: "rgb(72,72,72)" }}></Divider>
      <div className="center">
        <div className="left">
          <div className="logo">
            <Button variant={"none"} href="/">
              <img
                src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/logo-mona-2.png"
                alt=""
                className="img"
              />
            </Button>
          </div>
        </div>
        <div className="center">
          <div className="wrap_form">
            <div className="search_form">
              <input className="search_input" placeholder="Tìm kiếm..."></input>
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
        <div className="right">
          <Button variant={"text"}>
            <FavoriteIcon></FavoriteIcon>
          </Button>
          <div className="cart_icon">
            <div></div>
            <div className="body">1</div>
          </div>
        </div>
      </div>
      <Divider sx={{ background: "rgb(72,72,72)" }}></Divider>

      <div className="bottom">
        <ul className="navigation">
          <li className="item">
            <Button variant={"text-underline"} to="/">
              TRANG CHỦ
            </Button>
          </li>
          <li className="item">
            <Button variant={"text-underline"} to="/gioi-thieu">
              GIỚI THIỆU
            </Button>
          </li>
          <li className="item">
            <Button variant={"text-underline"} to="/">
              ĐỒNG HỒ NAM
            </Button>
          </li>
          <li className="item">
            <Button variant={"text-underline"} to="/">
              ĐỒNG HỒ NỮ
            </Button>
          </li>
          <li className="item">
            <Button variant={"text-underline"} to="/">
              BLOGS
            </Button>
          </li>
          <li className="item">
            <Button variant={"text-underline"} to="/">
              LIÊN HỆ
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
