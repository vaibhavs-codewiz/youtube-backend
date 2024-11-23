import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { user } from "../models/user.modle.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// get user details from frontend
// validation - not empty
// check if user already exists: username, email
// check for images, check for avatar
// upload them to cloudinary, avatar
// create user object - create entry in db
// remove password and refresh token field from response
// check for user creation
// return res
const registerUser = asyncHandler(async (req, res) => {
  //get user data :
  const { email, userName } = req.body;
  console.log("email:", email);
  console.log("user-name:", userName);
  // console.log(req.body);

  //validation only for checking if not empty:
  if ([email, userName].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "required full data");
  }

  //check if user already exists:
  const existedUser = await user.findOne({
    $or: [{ userName }, { email }],
  });
  //  console.log("existedUser:", existedUser);
  if (existedUser) {
    throw new ApiError(409, "user already exists.");
  }

  //check for images:
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required.");
  }
  console.log(req.files);

  //upload on cloudinary :
  const avatar = uploadOnCloudinary(avatarLocalPath);
  const coverImage = uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  //create user object and add in database :
  const user = await user.create(
    {
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      userName: userName.toLowerCase()
    }
  )

  //check for user creation and removing password and refresh token from it :
  const createdUser = await user.findById(user._id).select("-password -refreshToken");
  if(!createdUser){
    throw new ApiError(500, "something went wrong while registering the user.");
  }

  //crafting response:

  return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully.")
  )

});

export { registerUser };
