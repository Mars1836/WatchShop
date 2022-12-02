import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./productFeature.scss";
import ProductList from "../ProductList/ProductList";
import mt from "../../configs/const/method_filter";

function ProductFeature() {
  const [feature, setFeature] = useState();
  const features = [
    {
      text: "Sản phẩm phổ biến",
      filters: [
        {
          key: "discount",
          value: 30,
          method: mt.mt,
        },
      ],
      code: 1,
    },
    {
      text: "Sản phẩm khuyến mãi",
      code: 2,
      filters: [
        {
          key: "discount",
          value: 30,
          method: mt.lt,
        },
      ],
    },
    {
      text: "Sản phẩm mới",
      code: 3,
      filters: [
        {
          key: "gender",
          value: "male",
          method: mt.e,
        },
      ],
    },
  ];
  useEffect(() => {
    console.log("earea");
  }, [feature]);
  function handleClick(feature) {
    setFeature(feature);
  }
  return (
    <div className="product_feature">
      <div className="tab">
        {features.map((f, index) => {
          return (
            <Button
              variant={"text"}
              index={f.code}
              onClick={() => [handleClick(f)]}
              key={index}
              style={{
                paddingLeft: 0,
                paddingRight: 0,
                fontSize: "28px",
                fontWeight: 600,
                color: `${
                  feature?.code === f.code ? " var(--orange-1)" : "inherit"
                }`,
              }}
            >
              {f.text}
            </Button>
          );
        })}
      </div>
      <ProductList filters={feature?.filters}></ProductList>
    </div>
  );
}

export default ProductFeature;
