import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name:"dkca8amsu",
  api_key: "965365462337957",
  api_secret: "xil8e7YeDud-gHKkFLeyrN82doQ", // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localfilepath) => {
  // console.log(localfilepath);
  try {
    if (!localfilepath) return null;
    
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localfilepath);
    return response;
  } catch (error) {
    // console.log("error",error);
    fs.unlinkSync(localfilepath);
    return null;
  }
};

export { uploadOnCloudinary };
