
import { message } from "antd";
import {registerUser} from "../controllers/user.controller.js";
import express from "express"
const router = express.Router();

router.get("/demo",(req,res)=>{
    res.json({
        message:"hello"
    })
})
router.post("/register", registerUser);
export default router;