import express from "express";
import {isAuth} from "../middleware/isAuth.js";
import { getTeachers } from "../controller/teacherController.js";

const teacherRoute=express.Router();

teacherRoute.get("/",isAuth,getTeachers);

export default teacherRoute;