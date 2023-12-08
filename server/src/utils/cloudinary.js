import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const cloudinaryUploadImage = async (file, folder = "main") => {
  try {
    const a = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder: folder,
    });
    return a;
  } catch (error) {
    throw error;
  }
};
export const cloudinaryRemoveImage = async (public_id) => {
  try {
    const a = await cloudinary.uploader.destroy(public_id);
    return a;
  } catch (error) {
    throw error;
  }
};
export default cloudinary;
