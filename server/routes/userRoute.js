import express from "express";
import {isAuth} from "../middleware/isAuth.js";
import { getUsers } from "../controller/userController.js";

const userRoute=express.Router();

userRoute.get("/",isAuth,getUsers);

export default userRoute