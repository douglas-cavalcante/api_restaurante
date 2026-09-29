import { Router } from "express";
import { ROLES } from "../constants/roles.js";

import { asyncHandler } from "../middlewares/asyncHandler.js";
import { autorizarHandler } from "../middlewares/autorizarHandler.js";
import MesaController from "../controllers/MesaController.js";

const routesMesas = new Router();

const mesaController = new MesaController();

routesMesas.get(
  "/mesas",
  autorizarHandler(ROLES.ADMIN, ROLES.GARCOM, ROLES.GERENTE),
  asyncHandler(mesaController.buscarTodos),
);

routesMesas.post(
  "/mesas",
  autorizarHandler(ROLES.ADMIN, ROLES.GERENTE),
  asyncHandler(mesaController.cadastrar),
);

export default routesMesas;
