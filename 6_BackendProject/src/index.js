// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Ready");
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `SERVER IS TUNNING AT: http://localhost:${process.env.PORT}/`
      );
    });
  })
  .catch((err) => {
    console.log(`MONGO DB connection failed, ${err}`);
  });

/*
import express from "express"
const app = express()

// IIFE Fn : start me semicolon likhte ki pahle koi error nhi ho
;(async() => {
    try {
        //aise nhi connect /database name bhi dalte
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        app.on("error", (error) => {
            console.log("Err: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening at port: http://localhost:${process.env.PORT}/`);
        })
    } catch (error) {
        console.log("ERROR: ", error);
        throw error
        
    }
})()

*/

// SECOND APPROACH, DB folder me alag se file banaye vaha likhe aur export kr de

// Head to DB folder
