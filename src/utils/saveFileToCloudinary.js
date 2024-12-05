import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const saveFileToCloudinary = async (file) => {
  const result = await cloudinary.uploader.upload(file.path);
  await fs.unlink(file.path);
  return result.secure_url;
};