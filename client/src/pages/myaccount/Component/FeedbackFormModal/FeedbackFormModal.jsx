import React, { useEffect, useRef, useState } from "react"
import FeedbackForm from "../../../product/component/FeedbackForm"
import styles from "./feedbackFormModal.module.scss"
import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import productRequest from "../../../../requests/product"
import useAsyncData from "../../../../utils/hooks/asyncData"
import Button from "../../../../components/Button/Button"
const cx = classNames.bind(styles)
function FeedbackFormModal({ productId, onClose }) {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [productData, productError, productLoading] = useAsyncData(
    productRequest.getByQuery({
      id: productId,
      _findAll: "",
    }),
  )
  const feedbackRef = useRef()
  useEffect(() => {
    console.log(feedbackRef)
  }, [feedbackRef])
  function handleFeedbackSubmit() {
    feedbackRef.current.submit()
  }
  return (
    <div className={cx("feedback_form_modal")}>
      {productData && (
        <div className={cx("feedback_form_modal_wrapper")}>
          <div className={cx("item")} key={productData.id}>
            <div className={cx("left")}>
              <Link
                className={cx("name_product")}
                to={`/san-pham/${productData.id}`}
              >
                <img
                  src={productData.img}
                  alt=''
                  className={cx("item_image")}
                />
              </Link>
            </div>
            <div className={cx("right")}>
              <Link
                className={cx("item_name")}
                to={`/san-pham/${productData.id}`}
              >
                {productData.name}
              </Link>
              <p className={cx("item_detail")}>{productData.detail}</p>
              <div className={cx("price_wrapper")}>
                <div className={cx("price", "sale_price")}>
                  {productData.price}
                </div>
              </div>
            </div>
          </div>
          <FeedbackForm
            ref={feedbackRef}
            modal={true}
            productId={productId}
            handleIsSubmitLoading={setIsSubmitLoading}
            onClose={onClose}
          ></FeedbackForm>
        </div>
      )}
      <div className={cx("bottom")}>
        <Button
          variant={"outline"}
          style={{
            padding: "10px 22px",
            fontSize: "17px",
            fontWeight: 500,
            backgroundColor: "white",
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant={"contained"}
          style={{
            padding: "10px 22px",
            fontSize: "17px",
            fontWeight: 500,
          }}
          onClick={handleFeedbackSubmit}
          loading={isSubmitLoading}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default FeedbackFormModal
