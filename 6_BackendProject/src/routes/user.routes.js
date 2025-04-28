import { Router } from "express";
import { registerUser,regisUser } from "../controller/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields(
    [{
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    }]
  ),
  registerUser
);
//localhost:8000/api/v1/users/register
//middleware : jate hue mujse milke jana
//upload middleware
//Returns middleware that processes multiple files associated with the given form fields
//abb image bhej payenge

export default router;
