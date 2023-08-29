import userController from "../controller/user-controller.js";
import express from "express";

export const publicApi = express.Router();

publicApi.post("/user/login", userController.login);
publicApi.post("/user/refreshToken", userController.refreshToken);
