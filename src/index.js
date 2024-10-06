// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });

let port = process.env.PORT;
connectDB()
  .then(() => {
    app.listen(port || 8001, () => {
      console.log("server is running at port 8001", port);
    });
  })
  .catch((error) => {
    console.log("error in making connection", error);
  });
