import express from "express";
import { login, registerTeacher } from "../controller/authcontroller.js";

const authRoute=express.Router();

authRoute.post("/register-teacher",registerTeacher);
authRoute.post("/login",login);

export default authRoute;