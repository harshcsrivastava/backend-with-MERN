import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
// JsonWebTokenError;
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      //soch samajh ke index rakhna database pe toll padta
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudnary url Just Like AWS
      required: true,
    },
    coverImage: {
      type: String, //cloudnary url Just Like AWS
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
      //watch history ka array lenge jisme har video ka ek object hoga
    ],
    password: {
      type: String,
      // password ko kaise String rakha encrpt rakhenge
      // iske lie kuch krenge
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//Pre-save middleware
//kaam hone ke baad ki flag ab age pass krdo
//kisko karna, kitne round lagau: 8-10
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //modified nhi hua to skip kr do
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//problem ye hai ki avatar change kiya aur save kiya to vapas ye hook encrypt krega
//to ise password jab change ho tbhi krna

//we can create methods like middleware
userSchema.method.isPasswordCorrect = async function (password) {
  //bcryot khud compare krta ek string aur encripted pass leke
  return await bcrypt.compare(password, this.password); //time lega
};

//time nhi lagta
userSchema.method.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id, //mongoDB se miljaygea
      email: this.email,
      username: this.username,
      fullName: this.fullName, // right vla DATABASE se arha
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.method.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id, //mongoDB se miljaygea
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
