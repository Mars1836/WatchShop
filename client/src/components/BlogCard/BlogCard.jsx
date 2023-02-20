import Button from "../Button/Button";
import React from "react";
import Thumbnail from "../Thumnail/Thumbnail";
import styles from "./blogCard.module.scss";
import classNames from "classnames/bind";

function BlogCard({ blog, card = true }) {
  const cx = classNames.bind(styles);

  return (
    <div
      className={cx("blog_card_cpn", { card: card })}
      //   style={{ height: `${height ? height : "260px"}` }}
    >
      <div className={cx("image")}>
        <img src={`${blog.image}`}></img>
      </div>
      <div className={cx("text")}>
        <h3 className={cx("title")}>{blog.title}</h3>
        <span className={cx("line")}></span>
        <p className={cx("detail")}>
          {blog.paragraph[0].type === "main"
            ? blog.paragraph[0].highlight
            : blog.paragraph[0].highlight + " - " + blog.paragraph[0].body}
        </p>
      </div>
    </div>
  );
}

export default BlogCard;
