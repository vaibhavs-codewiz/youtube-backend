import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//giving cross origin issue
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     methods: 'GET,POST',
//     credentials: true
// }))

app.use(
  cors({
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

export default app;
