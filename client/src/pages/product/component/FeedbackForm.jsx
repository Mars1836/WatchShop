import React, { useState, useImperativeHandle } from "react"
import { Grid } from "@mui/material"
import { useSelector } from "react-redux"
import styles from "../product.module.scss"
import { Rating } from "@mui/material"

import { Button } from "@mui/material"
import instance from "../../../utils/configs/instance"
import {
  feedbackEndpoint,
  userProfileEndpoint,
} from "../../../utils/configs/api"
import ImageIcon from "@mui/icons-material/Image"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import classNames from "classnames/bind"
import AddIcon from "@mui/icons-material/Add"
const cx = classNames.bind(styles)

const FeedbackForm = React.forwardRef(
  ({ productId, setFeedbacks, modal, handleIsSubmitLoading, onClose }, ref) => {
    const user = useSelector(state => state.user.data)
    const [imagesReadyToSend, setImagesReadyToSend] = useState([])
    const [feedbackStar, setFeedbackStar] = useState(0)
    const quantityImageLimit = 5
    const isAuth = useSelector(state => state.user.auth)
    const {
      register,
      handleSubmit,
      reset,
      formState,
      formState: { errors },
      clearErrors,
    } = useForm()
    async function handleFeedbackSubmit({ feedbackContent }) {
      if (!isAuth) return toast.warning("Bạn cần đăng nhập trước!!!")
      const payload = {
        content: feedbackContent,
        star: feedbackStar,
        productId: productId,
        feedbackImages: imagesReadyToSend,
      }
      if (handleIsSubmitLoading) {
        handleIsSubmitLoading(true)
      }
      try {
        const { data } = await instance.post(feedbackEndpoint.create, payload)
        const handleFeedback = {
          ...data,
          user: user,
        }
        await new Promise(r => setTimeout(r, 1000))
        if (handleIsSubmitLoading) {
          handleIsSubmitLoading(false)
        }
        if (setFeedbacks) {
          setFeedbacks(pre => {
            return [handleFeedback, ...pre]
          })
        }

        setImagesReadyToSend([])
        onClose()
        toast.success("Thank you for your review")
      } catch (error) {
        toast.error(error?.message || error)
      }
    }
    async function handleUploadImage(e) {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      const { data } = await instance.post("/api/cloudinary/image", formData)
      setImagesReadyToSend(preArr => {
        return [...preArr, data]
      })
    }
    function handleRemoveImage(public_id) {
      console.log(public_id)
      const index = imagesReadyToSend.findIndex(item => {
        return public_id === item.public_id
      })
      console.log(index)
      const array = [...imagesReadyToSend]
      array.splice(index, 1)
      instance.delete("/api/cloudinary/image/" + public_id)
      setImagesReadyToSend(array)
    }
    React.useEffect(() => {
      if (formState.isSubmitSuccessful) {
        reset({ feedbackContent: "" })
      }
    }, [formState, reset])

    useImperativeHandle(ref, () => {
      return {
        submit: () => {
          handleSubmit(handleFeedbackSubmit)()
        },
      }
    })
    return (
      <div className={cx("feedback_form")}>
        <div className={cx("form_rating")}>
          <p className={cx("title")}>Đánh giá của bạn</p>
          <div className={cx("star_rate")}>
            <Rating
              name='simple-controlled'
              value={feedbackStar}
              onChange={(event, newValue) => {
                setFeedbackStar(newValue)
              }}
              style={{ fontSize: "30px" }}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit(handleFeedbackSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
              <label className={cx("title")} htmlFor='comment'>
                Nhận xét của bạn
              </label>

              {
                <div className={cx("image_list")}>
                  {imagesReadyToSend.map((item, index) => {
                    return (
                      <div key={item.public_id} className={cx("image_item")}>
                        <img src={item.url} alt=''></img>
                        <div className={cx("image_overlay")}>
                          <button
                            className={cx("btn_remove_image")}
                            onClick={() => {
                              handleRemoveImage(item.public_id)
                            }}
                          >
                            <HighlightOffIcon className={cx("icon")} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                  {modal && quantityImageLimit > imagesReadyToSend.length && (
                    <div className={cx("add_image_modal")}>
                      <label className={cx("add_image_modal_label")}>
                        <ImageIcon className={cx("icon")} />
                        <p className={cx("count_image")}>
                          {imagesReadyToSend.length + "/" + quantityImageLimit}
                        </p>
                        <input
                          type='file'
                          style={{ display: "none" }}
                          name='image'
                          accept='image/*'
                          onChange={handleUploadImage}
                        />
                      </label>
                    </div>
                  )}
                </div>
              }

              <textarea
                className={cx("input")}
                id='comment'
                {...register("feedbackContent", {
                  required: true,
                })}
              ></textarea>
              {errors.feedbackContent?.type === "required" && (
                <p className={cx("error_message")}>This field is required.</p>
              )}

              {!modal && (
                <Button
                  component='label'
                  variant={"contained"}
                  style={{ color: "var(--text-light)" }}
                  endIcon={<ImageIcon />}
                >
                  Add image
                  <input
                    type='file'
                    style={{ display: "none" }}
                    name='image'
                    accept='image/*'
                    onChange={handleUploadImage}
                  />
                </Button>
              )}
            </Grid>
            {!modal && (
              <Grid item xs={12} sm={6} md={6}>
                <Button
                  type={"submit"}
                  className={cx("btn_submit")}
                  variant={"contained"}
                >
                  Submit
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      </div>
    )
  },
)

export default FeedbackForm
