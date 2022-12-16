import React from "react";
import products from "../../data/products";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import blogs from "../../data/blog";
function Sidebar() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("sidebar_cpn")}>
      <div className={cx("group")}>
        <h3 className={cx("title")}>DANH MỤC SẢN PHẨM</h3>
        <div className={cx("items")}>
          <div className={cx("item")}>Demo</div>
          <div className={cx("item")}>Demo</div>
          <div className={cx("item")}>Sản phẩm</div>
        </div>
      </div>
      <div className={cx("group")}>
        <h3 className={cx("title")}>DANH MỤC SẢN PHẨM</h3>
        <div className={cx("items")}>
          <div className={cx("item")}>
            <img src={products[1].img} alt="" className={cx("image")}></img>
            <div className="item_dt">
              <div className="name">{products[1].name}</div>
              <div className="price">{products[1].price}₫</div>
            </div>
          </div>
          <div className={cx("item")}>
            <img src={products[2].img} alt="" className={cx("image")}></img>
            <div className="item_dt">
              <div className="name">{products[2].name}</div>
              <div className="price">{products[2].price}₫</div>
            </div>
          </div>
          <div className={cx("item")}>
            <img src={products[3].img} alt="" className={cx("image")}></img>
            <div className="item_dt">
              <div className="name">{products[3].name}</div>
              <div className="price">{products[3].price}₫</div>
            </div>
          </div>
          <div className={cx("item")}>
            <img src={products[4].img} alt="" className={cx("image")}></img>
            <div className="item_dt">
              <div className="name">{products[4].name}</div>
              <div className="price">{products[4].price}₫</div>
            </div>
          </div>
          <div className={cx("item")}>
            <img src={products[5].img} alt="" className={cx("image")}></img>
            <div className="item_dt">
              <div className="name">{products[5].name}</div>
              <div className="price">{products[5].price}₫</div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("group")}>
        <h3 className={cx("title")}>BÀI VIẾT MỚI NHẤT</h3>
        <div className={cx("blog_items")}>
          <div className={cx("item")}>
            <div
              style={{ backgroundImage: `url(${blogs[0].paragraph[0].image})` }}
              alt=""
              className={cx("image")}
            ></div>
            <div className={cx("title")}>{blogs[0].paragraph[0].title}</div>
          </div>
          <div className={cx("item")}>
            <div
              style={{ backgroundImage: `url(${blogs[0].paragraph[0].image})` }}
              alt=""
              className={cx("image")}
            ></div>
            <div className={cx("title")}>{blogs[0].paragraph[0].title}</div>
          </div>
          <div className={cx("item")}>
            <div
              style={{ backgroundImage: `url(${blogs[0].paragraph[0].image})` }}
              alt=""
              className={cx("image")}
            ></div>
            <div className={cx("title")}>{blogs[0].paragraph[0].title}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
