import { Router } from "express";
import { ROLES } from "../constants/roles.js";

import { asyncHandler } from "../middlewares/asyncHandler.js";
import { autorizarHandler } from "../middlewares/autorizarHandler.js";

import ItemPedidoController from "../controllers/ItemPedidoController.js";

const itemsPedidosRoutes = new Router();

const itemPedidoController = new ItemPedidoController();

itemsPedidosRoutes.post(
  "/items-pedidos",
  autorizarHandler(ROLES.ADMIN, ROLES.GERENTE, ROLES.GARCOM),
  asyncHandler(itemPedidoController.cadastrar),
);

export default itemsPedidosRoutes;
