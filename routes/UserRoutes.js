import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData, getProfile, updateProfile } from "../controller/UserController.js";

const userRouter = new express.Router();

userRouter.get("/data",userAuth,getUserData)

// Protected routes - require authentication
userRouter.get('/profile', userAuth, getProfile);
userRouter.put('/profile', userAuth, updateProfile);

export default userRouter;