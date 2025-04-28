import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//mera backend kis kis logo se baat krne de rhe
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//data kayi jagah se ayega to unke liye configure kr rhe
app.use(express.json({ limit: "16kb" }));
//jaise space %20 pban jata
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
//public assets kr deta
app.use(cookieParser());


//============================================= 
//routes import
import userRouter from "./routes/user.routes.js";

//routes declaration
// app.use("/users", userRouter);
// hm api bana rhe to aise likheneg
app.use("/api/v1/users", userRouter);


//localhost:8000/api/v1/users/register

export { app };
