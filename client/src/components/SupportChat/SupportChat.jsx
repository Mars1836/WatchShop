import React, { useState } from "react"
import classNames from "classnames/bind"
import styles from "./support_chat.module.scss"
import ForumIcon from "@mui/icons-material/Forum"
import MoodIcon from "@mui/icons-material/Mood"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import ImageIcon from "@mui/icons-material/Image"
import SendIcon from "@mui/icons-material/Send"
const cx = classNames.bind(styles)

function SupportChat() {
  const [active, setActive] = useState(false)
  const handleActive = () => {
    setActive(!active)
  }
  return (
    <div className={cx("support_chat", { active: active })}>
      <div className={cx("form_chat")}>
        <div className={cx("form_chat_header")}>
          <h3>Chat</h3>
          <button onClick={handleActive}>
            <KeyboardArrowDownIcon className={cx("icon")} />
          </button>
        </div>
        <div className={cx("form_chat_body")}> </div>
        <div className={cx("form_chat_bottom")}>
          <div className={cx("form_chat_bottom_top")}>
            <div className={cx("form_chat_input")}>
              <span
                className={cx("input")}
                role='textbox'
                contentEditable
              ></span>
            </div>
          </div>
          <div className={cx("form_chat_bottom_bottom")}>
            <div className={cx("form_chat_bottom_bottom_left")}>
              <MoodIcon className={cx("icon")} />
              <ImageIcon className={cx("icon")} />
            </div>
            <div className={cx("form_chat_bottom_bottom_right")}>
              <SendIcon className={cx("icon")} />
            </div>
          </div>
        </div>
      </div>
      <div className={cx("support_chat_btn")} onClick={handleActive}>
        <ForumIcon className={cx("icon")}></ForumIcon>
        <h3>Chat</h3>
      </div>
    </div>
  )
}

export default SupportChat
