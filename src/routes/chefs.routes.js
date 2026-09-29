import { Router } from "express";
import { ChefEntity } from "../entidades/Chef.js";

import { asyncHandler } from "../middlewares/asyncHandler.js";
import { verifyIdExistsHandler } from "../middlewares/verifyIdExistsHandler.js";

import ChefController from "../controllers/ChefController.js";

const chefsRoutes = new Router();

const chefController = new ChefController();

chefsRoutes.post("/chefs", asyncHandler(chefController.cadastrar));

chefsRoutes.get("/chefs", asyncHandler(chefController.buscarTodos));

chefsRoutes.get(
  "/chefs/:id",
  verifyIdExistsHandler(ChefEntity, "Chef"),
  asyncHandler(chefController.buscarUm),
);

chefsRoutes.put(
  "/chefs/:id",
  verifyIdExistsHandler(ChefEntity, "Chef"),
  asyncHandler(chefController.atualizar),
);

chefsRoutes.delete(
  "/chefs/:id",
  verifyIdExistsHandler(ChefEntity, "Chef"),
  asyncHandler(chefController.deletar),
);

export default chefsRoutes;
