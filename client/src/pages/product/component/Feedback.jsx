import React, { useEffect, useState, useRef } from "react"
import { Rating } from "@mui/material"
import classNames from "classnames/bind"
import styles from "../product.module.scss"
import formatDate from "../../../utils/function/formatDate"
import { Grid } from "@mui/material"

import { Button } from "@mui/material"
import instance from "../../../utils/configs/instance"
import {
  feedbackEndpoint,
  userProfileEndpoint,
} from "../../../utils/configs/api"
import getAverageStar from "../../../utils/function/getAverageStar"

import Stick from "./Stick"

import FeedbackForm from "./FeedbackForm"
const cx = classNames.bind(styles)
function Feedback({
  tabs,
  productId,
  handleProductStar,
  handleQuantityFeedback,
}) {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    console.log(productId)
    const getFeedbacks = async () => {
      const { data } = await instance.get(
        feedbackEndpoint.getByProductId + productId,
      )
      console.log(data)
      if (!Array.isArray(data)) {
        return
      }
      const handledDatas = await Promise.all(
        data.map(async item => {
          const { data } = await instance.get(
            userProfileEndpoint.getUserProfileById + item.userProfileId,
          )
          return { ...item, user: data }
        }),
      )
      setFeedbacks(handledDatas)
    }
    getFeedbacks()
  }, [productId])
  useEffect(() => {
    handleProductStar(getAverageStar(feedbacks))
    handleQuantityFeedback(feedbacks.length)
  }, [feedbacks])

  return (
    <div
      className={cx("feedback")}
      id='feedback'
      style={tabs === 1 ? {} : { display: "none" }}
    >
      <div className={cx("comment_list")}>
        {feedbacks.map((feedback, index) => {
          return (
            <div className={cx("comment")} key={feedback.id}>
              <div className={cx("avatar")}>
                <img
                  src={feedback.user.avatar}
                  alt=''
                  className={cx("avatar_img")}
                />
              </div>
              <div className={cx("wrapper")}>
                <p className={cx("name")}>{feedback.user.name}</p>
                <div className={cx("star_rate")}>
                  <Rating
                    name='half-rating'
                    defaultValue={feedback.star}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className={cx("timestamp")}>
                  {formatDate(feedback.createdAt)}
                </div>
                <div className={cx("comment_content")}>{feedback.content}</div>

                <>
                  {feedback?.feedback_images.length > 0 && (
                    <div className={cx("image_list")}>
                      <Stick data={feedback?.feedback_images}></Stick>
                    </div>
                  )}
                </>
              </div>
            </div>
          )
        })}
      </div>

      <FeedbackForm
        productId={productId}
        setFeedbacks={setFeedbacks}
      ></FeedbackForm>
    </div>
  )
}

export default Feedback
