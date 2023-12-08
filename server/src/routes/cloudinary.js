import express from "express";
import {
  cloudinaryRemoveImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";
import upload from "../middlewares/multer.js";
const cloudinaryRouter = express.Router();
cloudinaryRouter.post("/images", upload.array("image"), async (req, res) => {
  const uploadedFiles = req.files; // Contains an array of uploaded files
  const errors = [];
  const responses = [];
  // Handle each uploaded file (e.g., upload to Cloudinary)
  for (const file of uploadedFiles) {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    try {
      const a = await cloudinaryUploadImage(dataURI, "feedback");
      responses.push(a);
    } catch (error) {
      errors.push(error);
    }
  }
  res.status(200).json({ errors, responses });
});
cloudinaryRouter.post("/image", upload.single("image"), async (req, res) => {
  try {
    const file = req.file; // Contains an array of uploaded files
    if (!file) {
      return res.send("");
    }
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const a = await cloudinaryUploadImage(dataURI, "feedback");
    res.status(200).json(a);
  } catch (e) {
    res.status(500).json(e);
  }
});
cloudinaryRouter.delete("/image/:publicId", async (req, res) => {
  const { publicId } = req.params;
  console.log(public_id);
  try {
    const a = await cloudinaryRemoveImage(publicId);
    res.status(200).json(a);
  } catch (e) {
    res.status(500).json(e);
  }
});
export default cloudinaryRouter;
