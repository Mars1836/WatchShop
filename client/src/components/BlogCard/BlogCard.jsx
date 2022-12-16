import Button from "../Button/Button";
import React from "react";
import Thumbnail from "../Thumnail/Thumbnail";
import styles from "./blogCard.module.scss";
import classNames from "classnames/bind";

function BlogCard({ height }) {
  const cx = classNames.bind(styles);
  return (
    <div
      className={cx("blog_card_cpn")}
      //   style={{ height: `${height ? height : "260px"}` }}
    >
      <Thumbnail
        img="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/new-4.jpg"
        height="240px"
      ></Thumbnail>
      <div className={cx("text")}>
        <Button
          variant="text"
          style={{
            color: "var(--text-dark)",
            fontSize: "20px",
            whiteSpace: "normal",
            textAlign: "start",
            padding: "0 0px",
            fontWeight: "500",
          }}
        >
          Chiếc đồng hồ của những CEO quyền lực nhất thế giới
        </Button>
        <p className={cx("detail")}>
          Đối với một số doanh nhân, một chiếc đồng hồ đeo tay không chỉ là ...
        </p>
      </div>
    </div>
  );
}

export default BlogCard;
