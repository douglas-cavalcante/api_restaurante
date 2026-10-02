import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { PedidoEntity } from "../entidades/Pedido.js";

import { asyncHandler } from "../middlewares/asyncHandler.js";
import { verifyIdExistsHandler } from "../middlewares/verifyIdExistsHandler.js";
import { autorizarHandler } from "../middlewares/autorizarHandler.js";
import { uploadHandler } from "../middlewares/uploadHandler.js";

import PedidoController from "../controllers/PedidoController.js";

const pedidosRoutes = new Router();

const pedidoController = new PedidoController();

pedidosRoutes.put(
  "/pedidos/:id/fechar",
  autorizarHandler(ROLES.GARCOM, ROLES.GERENTE, ROLES.ADMIN),
  verifyIdExistsHandler(PedidoEntity, "Pedido"),
  asyncHandler(pedidoController.fechar),
);

pedidosRoutes.post(
  "/pedidos",
  autorizarHandler(ROLES.GARCOM, ROLES.GERENTE, ROLES.ADMIN),
  asyncHandler(pedidoController.cadastrar),
);

pedidosRoutes.get(
  "/pedidos",
  autorizarHandler(ROLES.GARCOM, ROLES.GERENTE, ROLES.ADMIN, ROLES.CHEF),
  asyncHandler(pedidoController.buscarTodos),
);

pedidosRoutes.get(
  "/pedidos/:id",
  autorizarHandler(ROLES.GARCOM, ROLES.GERENTE, ROLES.ADMIN, ROLES.CHEF),
  verifyIdExistsHandler(PedidoEntity, "Pedido"),
  asyncHandler(pedidoController.buscarUm),
);

// png jpeg pdf excel - extensao
// mime-type

const uploadComprovante = uploadHandler([
  "image/jpeg",
  "image/png",
  "application/pdf",
  "image/webp",
]);

pedidosRoutes.put(
  "/pedidos/:id/comprovante",
  autorizarHandler(ROLES.GARCOM, ROLES.GERENTE, ROLES.ADMIN),
  verifyIdExistsHandler(PedidoEntity, "Pedido"),
  uploadComprovante.single("comprovante"),
  asyncHandler(pedidoController.salvarComprovante),
);

pedidosRoutes.get(
  "/pedidos/:id/comprovante",
  autorizarHandler(ROLES.GARCOM, ROLES.GERENTE, ROLES.ADMIN),
  verifyIdExistsHandler(PedidoEntity, "Pedido"),
  asyncHandler(pedidoController.buscarComprovante),
);

/*
pedidosRoutes.post(
  "/pedidos/:id/comprovante",
  autorizarHandler(ROLES.GARCOM, ROLES.GERENTE, ROLES.ADMIN),
  verifyIdExistsHandler(PedidoEntity, "Pedido"),
  uploadComprovante.single("comprovante"), // nome do campo no form-data
  asyncHandler(pedidoController.anexarComprovante),
);


*/

export default pedidosRoutes;
