import React, { useDeferredValue, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import blogs from "../../data/blogs";
import useDelayUpdate from "../../utils/hooks/delayUpdate";
import { Slider, Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Search from "@mui/icons-material/Search";
import mt from "../../utils/obj/method_filter";
function Sidebar({
  product = false,
  blog = false,
  product_tag = false,
  search = false,
  product_price = false,
  onFilterChange,
}) {
  const cx = classNames.bind(styles);
  const products = useSelector((state) => state.product.data);

  const [tags, setTags] = useState([]);
  const [tempPrice, setTempPrice] = useState([0, 500]);
  const [searchValue, setSearchValue] = useState("");
  const delayValue = useDelayUpdate(searchValue);
  const [priceValue, setPriceValue] = useState([0, 500 * 1000]);
  useEffect(() => {
    console.log(delayValue);
  }, [delayValue]);

  const handlePriceFilterChange = (event, newValue) => {
    setTempPrice(newValue);
  };
  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  function handleTags(e) {
    let index = tags.findIndex((t) => {
      return t === e.target.value;
    });
    if (index === -1) {
      setTags((pre) => {
        return [...pre, e.target.value];
      });
    } else {
      let newArr = Array.from(tags);
      newArr.splice(index, 1);
      setTags((pre) => {
        return newArr;
      });
    }
  }
  function getFilter() {
    let newFilter = [
      {
        key: "name",
        value: delayValue.trim(),
        method: mt.in,
      },
      {
        key: "tags",
        value: tags,
        method: mt.in,
      },
      {
        key: "price",
        value: priceValue,
        method: mt.btw,
      },
    ];
    if (typeof onFilterChange === "function") onFilterChange(newFilter);
  }

  useEffect(() => {
    getFilter();
  }, [tags, delayValue, priceValue]);
  return (
    <div className={cx("sidebar_cpn")}>
      {search && (
        <div className={cx("group")}>
          <h3 className={cx("title")}>Search</h3>
          <div className={cx("search_form")}>
            <input
              className={cx("search_input")}
              placeholder="Tìm kiếm..."
              value={searchValue}
              onChange={handleSearchValue}
            ></input>
            <span>
              <Search className={cx("icon")}></Search>
            </span>
          </div>
        </div>
      )}
      {product_price && (
        <div className={cx("group")}>
          <h3 className={cx("title")}>Filter price</h3>
          <div className={cx("filter_price")}>
            <Slider
              max={500}
              value={tempPrice}
              color="primary"
              size="small"
              onChange={handlePriceFilterChange}
              valueLabelDisplay="auto"
            />
            <div className={cx("price_value")}>
              <div>
                <span>Price:</span>
                <h4>{`${tempPrice[0]}k - ${tempPrice[1]}k`}</h4>
              </div>
              <button
                className={cx("btn")}
                onClick={() => {
                  setPriceValue([tempPrice[0] * 1000, tempPrice[1] * 1000]);
                }}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      )}
      {product_tag && (
        <div className={cx("group")}>
          <h3 className={cx("title")}>Product tags</h3>
          <div className={cx("tag_list")}>
            <div className="item">
              <input
                type="checkbox"
                id="digital"
                name="tag"
                onChange={handleTags}
                value="digital"
              ></input>
              <label className={cx("tag_btn")} htmlFor="digital">
                Digital
              </label>
            </div>
            <div className="item">
              <input
                type="checkbox"
                id="sport"
                name="tag"
                value="sport"
                onChange={handleTags}
              ></input>
              <label className={cx("tag_btn")} htmlFor="sport">
                Sport
              </label>
            </div>
            <div className="item">
              <input
                type="checkbox"
                id="fashion"
                name="tag"
                onChange={handleTags}
                value="fashion"
              ></input>
              <label className={cx("tag_btn")} htmlFor="fashion">
                Fashion
              </label>
            </div>
            <div className="item">
              <input
                type="checkbox"
                id="luxury"
                name="tag"
                value="luxury"
                onChange={handleTags}
              ></input>
              <label className={cx("tag_btn")} htmlFor="luxury">
                Luxury
              </label>
            </div>
            <div className="item">
              <input
                type="checkbox"
                id="analog"
                name="tag"
                value="analog"
                onChange={handleTags}
              ></input>
              <label className={cx("tag_btn")} htmlFor="analog">
                Analog
              </label>
            </div>
            <div className="item">
              <input
                type="checkbox"
                id="classic"
                name="tag"
                value="classic"
                onChange={handleTags}
              ></input>
              <label className={cx("tag_btn")} htmlFor="classic">
                Classic
              </label>
            </div>
          </div>
        </div>
      )}
      <>
        {product && (
          <>
            <div className={cx("group")}>
              <h3 className={cx("title")}>DANH MỤC SẢN PHẨM</h3>
              <div className={cx("items")}>
                {products.slice(0, 4).map((pr) => {
                  return (
                    <div className={cx("item")} key={pr.id}>
                      <img src={pr.img} alt="" className={cx("image")}></img>
                      <div className="item_dt">
                        <div className="name">{pr.name}</div>
                        <div className="price">{pr.price}₫</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </>
      {blog && (
        <div className={cx("group")}>
          <h3 className={cx("title")}>BÀI VIẾT MỚI NHẤT</h3>
          <div className={cx("blog_items")}>
            {blogs.map((blog) => {
              return (
                <div className={cx("item")} key={blog.id}>
                  <div
                    style={{ backgroundImage: `url(${blog.image})` }}
                    alt=""
                    className={cx("image")}
                  ></div>
                  <div className={cx("des")}>{blog.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
