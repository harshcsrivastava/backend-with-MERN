import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
//user direct mongoose se baat kr skta
//we will ask DB ki if aisa koi user exist krta using findOne()
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import path from "path";

const registerUser = asyncHandler(async (req, res) => {
  /*
  - Get user details from frontend
  - Validation - not empty
  - Check if user already exist(email se check kr lo ya username)
  - check for images, check for avatar
  - upload them to cloudinary, avatar => image vapas agyi
  - create user object - create entry in DB 
  - remove password and refresh token field from response
  - check for user creation
  - return response

  For filehandling
  we use multer middleware
  */
  // console.log("Files received:", req.files);

  const { fullName, email, username, password } = req.body;
  // console.log("email", email);

  // if(fullName === ""){
  //   throw new ApiError(400,"Full Name cannot be left empty.")
  // }
  //kid method

  // .some
  // A function that accepts up to three arguments. The some method calls the predicate function for each
  //  element in the array until the predicate returns a value which is coercible to the Boolean
  // value true, or until the end of the array.

  //next upload on cloudinary
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Cannot be left empty.");
  }
  // .some() is an array method that checks if at least one element in the array meets a given condition.

  //production me validation ki alag se file hoti hai

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already registered.");
  }

  //multer deta hai
  const avatarLocalPath = req.files?.avatar[0]?.path.replace(/\\/g, "/");
  // ise console log krke dekho

  // const coverImageLocalPath = req.files?.coverImage[0]?.path.replace(/\\/g, "/");
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path.replace(/\\/g, "/");
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is Required.");
  }

  //wait kro kab tk upload na hojaye
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar dedo Required.");
  }

  // Creating User Avatar, user hi baat kr rha
  const user = await User.create({
    fullName,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "", //(check hi nhi kara ki coverImage ka user ne diya ya nhi isiliye check laga lena)
    email,
    password,
    username: username.toLowerCase(),
  });

  //remove password and token
  //select method se vo select kro and -password - jo nhi chahiye
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating a user.");
  }

  //organixe tarike se bhejende APIresponse se
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  // Get user username/email and password from req.files
  // destructure kr lo
  // Check if user exists in DB
  //I If mill jata
  // Check if password is correct 
  // generate access and refresh token
  // send secure cookie
  /// return response
  // If incorrect, display error => then redirect to /register

  const {email, username, password} = req.body;

   if(!username || !email){
    throw new ApiError(400, "Username or Email is Required.")
   }

   // ye $ krne ke baaad operators hai dono me se koi ho to
   const user = await User.findOne(
    {
      $or: [{ username }, { email }]
    }
   )


});

//bsss
export { registerUser, loginUser };
