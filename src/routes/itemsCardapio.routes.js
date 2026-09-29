import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { ItemCardapioEntity } from "../entidades/ItemCardapio.js";

import { asyncHandler } from "../middlewares/asyncHandler.js";
import { verifyIdExistsHandler } from "../middlewares/verifyIdExistsHandler.js";
import { validateUpdateItemCardapio } from "../middlewares/validations/items_cadarpio/validateUpdateItemCardapio.js";
import { autorizarHandler } from "../middlewares/autorizarHandler.js";

import ItemCardapioController from "../controllers/ItemCardapioController.js";

const routesItemsCardapio = new Router();

const itemCardapioController = new ItemCardapioController();

routesItemsCardapio.put(
  "/items-cardapio/:id",
  autorizarHandler(ROLES.ADMIN, ROLES.GERENTE),
  verifyIdExistsHandler(ItemCardapioEntity, "Item do cardápio"),
  validateUpdateItemCardapio,
  asyncHandler(itemCardapioController.atualizar),
);

routesItemsCardapio.delete(
  "/items-cardapio/:id",
  autorizarHandler(ROLES.ADMIN, ROLES.GERENTE),
  verifyIdExistsHandler(ItemCardapioEntity, "Item do cardápio"),
  asyncHandler(itemCardapioController.deletar),
);

routesItemsCardapio.get(
  "/items-cardapio",
  autorizarHandler(ROLES.ADMIN, ROLES.GERENTE, ROLES.CHEF, ROLES.GARCOM),
  asyncHandler(itemCardapioController.buscarTodos),
);

routesItemsCardapio.get(
  "/items-cardapio/:id",
  autorizarHandler(ROLES.ADMIN, ROLES.GERENTE, ROLES.CHEF, ROLES.GARCOM),
  verifyIdExistsHandler(ItemCardapioEntity, "Item do cardápio"),
  asyncHandler(itemCardapioController.buscarUm),
);

routesItemsCardapio.post(
  "/items-cardapio",
  autorizarHandler(ROLES.ADMIN, ROLES.GERENTE),
  asyncHandler(itemCardapioController.cadastrar),
);

export default routesItemsCardapio;
