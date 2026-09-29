import { Router } from "express";
import { ROLES } from "../constants/roles.js";

import { asyncHandler } from "../middlewares/asyncHandler.js";
import { autorizarHandler } from "../middlewares/autorizarHandler.js";

import AuthController from "../controllers/AuthController.js";

const authRoutes = new Router();

const authController = new AuthController();

authRoutes.post(
  "/auth/usuarios",
  autorizarHandler(ROLES.ADMIN),
  asyncHandler(authController.cadastrarUsuario),
);

export default authRoutes;
