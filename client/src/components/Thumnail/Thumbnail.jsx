import React from "react";
import "./thumbnail.scss";
function Thumbnail({ children, img, position, height }) {
  console.log(position);
  return (
    <div
      className="thumbnail"
      style={{ height: `${height ? height : "300px"}` }}
    >
      <div
        className="background"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: `${position ? position : "right"}`,
        }}
      ></div>
      {children}
    </div>
  );
}

export default Thumbnail;
