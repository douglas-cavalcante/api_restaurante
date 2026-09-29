import { Router } from "express";

import { asyncHandler } from "../middlewares/asyncHandler.js";
import AuthController from "../controllers/AuthController.js";

const publicRoutes = new Router();

const authController = new AuthController();

publicRoutes.post("/auth/login", asyncHandler(authController.login));

export default publicRoutes;
