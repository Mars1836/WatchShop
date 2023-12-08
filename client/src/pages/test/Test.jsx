import React, { useEffect, useState } from "react"
import instance from "../../utils/configs/instance"
import Stick from "../product/component/Stick"
const TestPage = () => {
  // Set the Cloud configuration and URL configuration
  const [image, setImage] = useState(null)
  const [imageBub, setImageBub] = useState(null)
  const [imagePaste, setImagePaste] = useState("")
  const [imageFile, setImageFile] = useState("")
  const handleUploadImage = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("image", image)
    formData.append("image", imagePaste)

    const data = await instance.post("/api/cloudinary/upload/images", formData)
  }
  const handleSetImage = e => {
    setImage(e.target.files[0])

    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = function () {
      setImageFile(reader.result)
    }
    reader.onerror = function (error) {
      console.log("Error: ", error)
    }
  }
  const handlePaste = event => {
    const clipboardItems = event.clipboardData.items
    console.log([].slice.call(clipboardItems))
    const items = [].slice.call(clipboardItems).filter(function (item) {
      console.log(item.type)
      return item.type.indexOf("image") !== -1
    })
    if (items.length === 0) {
      return
    }
    const item = items[0]
    const blob = item.getAsFile()

    setImagePaste(blob)
  }
  useEffect(() => {
    console.log(imagePaste)
  }, [imagePaste])
  return (
    <div>
      <form onSubmit={handleUploadImage}>
        <input type={"file"} name='image' onChange={handleSetImage} />
        <input type='text' onPasteCapture={handlePaste}></input>
        <img src={imagePaste} alt='' style={{ width: "100px" }} />
        <img src={imageFile} alt='' style={{ width: "100px" }} />
        <button type='submit'>Submit</button>
      </form>
      <Stick />
    </div>
  )
}
export default TestPage
