//sabse cloudnary se leke ate
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

if (!process.env.CLOUDINARY_API_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Cloudinary environment variables are not set.");
}
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null

    //upload the file on cloudinary, kis type ki upload kar skte vo site me dekh skte
    console.log(localFilePath);
    
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //file has been successfully uploaded
    console.log(`Uploaded on Cloudinary ${response.url}`); //.url jo public url hai miljayega
    fs.unlinkSync(localFilePath)
    return response;

  } catch (error) {
    //unlinkSync ensure krega ki hona hi chahiye
    //removing the locally save temp file as the upload operation got failed
    // console.error("Cloudinary Upload Error: ", error); 


    fs.unlinkSync(localFilePath); //remove file after uploading
    return null;
    // console.error("Cloudinary upload error:", error); // 👉 LOG the real error first
    // if (localFilePath) {
    //   fs.unlinkSync(localFilePath);
    // }
    // return null;
  }
};

export { uploadOnCloudinary };
