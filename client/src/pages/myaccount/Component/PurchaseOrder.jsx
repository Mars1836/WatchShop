import React, { useEffect, useState, useRef } from "react"
import classNames from "classnames/bind"
import styles from "./styles.module.scss"
import Divider from "@mui/material/Divider"
import { Button, CircularProgress } from "@mui/material"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import instance from "../../../utils/configs/instance"
import orderRequest from "../../../requests/order"
import useAsyncData from "../../../utils/hooks/asyncData"
import orderItemRequest from "../../../requests/order_item"
import Modal from "../../../components/Modal/Modal"
import FeedbackFormModal from "./FeedbackFormModal/FeedbackFormModal"
const cx = classNames.bind(styles)

function PurchaseOrder() {
  const [orders, errorOrders, loadingOrders] = useAsyncData(
    orderRequest.getByQuery({ _findAll: 1, status: "Completed" }),
  )
  const [orderItems, errorOrderItems, loadingOrderItems] = useAsyncData(
    orderRequest
      .getByQuery({ _findAll: 1, status: "Completed" })
      .then(({ data }) => {
        const arr = data.map(item => {
          return item.id
        })
        return orderItemRequest.getByOrder({ orderId: arr, _findAll: 1 })
      }),
  )
  const modalRef = useRef()

  const [productModalReviewOpen, setProductModalReviewOpen] = useState(null)
  const handleModelReviewClose = () => {
    setProductModalReviewOpen(null)
  }

  useEffect(() => {
    console.log(orderItems)
  }, [orderItems])
  function modalClose() {
    modalRef.current.modalClose()
  }
  return (
    <div className={cx("purchase_order")}>
      <Modal
        open={productModalReviewOpen}
        onClose={handleModelReviewClose}
        ref={modalRef}
        closeOnClickBeside={false}
      >
        <FeedbackFormModal
          onClose={modalClose}
          productId={productModalReviewOpen}
        ></FeedbackFormModal>
      </Modal>
      <h3 className={cx("title")}>Purchase order</h3>
      <div className={cx("list_purchase_order")}>
        {!(orderItems && orderItems.length > 0) ? (
          <div>
            {loadingOrderItems ? (
              <CircularProgress />
            ) : (
              <p>You have not purchased any products yet!</p>
            )}
          </div>
        ) : (
          orderItems?.map((item, index) => {
            return (
              <div className={cx("item")} key={item.product.id}>
                <div className={cx("left")}>
                  <Link
                    className={cx("name_product")}
                    to={`/san-pham/${item.product.id}`}
                  >
                    <img
                      src={item.product.img}
                      alt=''
                      className={cx("item_image")}
                    />
                  </Link>
                </div>
                <div className={cx("center")}>
                  <Link
                    className={cx("item_name")}
                    to={`/san-pham/${item.product.id}`}
                  >
                    {item.product.name}
                  </Link>
                  <p className={cx("item_detail")}>{item.product.detail}</p>
                  <p className={cx("item_quantity")}>x{item.quantity}</p>
                </div>
                <div className={cx("right")}>
                  <div className={cx("price_wrapper")}>
                    <div className={cx("price", "sale_price")}>
                      {item.product.price}
                    </div>
                  </div>
                  <Button
                    variant='contained'
                    sx={{
                      color: "var( --text-light)",
                    }}
                    onClick={() => {
                      setProductModalReviewOpen(item.product.id)
                    }}
                  >
                    Review
                  </Button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default PurchaseOrder
