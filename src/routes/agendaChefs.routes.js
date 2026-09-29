import { Router } from "express";

import { asyncHandler } from "../middlewares/asyncHandler.js";

import AgendaChefController from "../controllers/AgendaChefController.js";

const agendaChefs = new Router();

const agendaChefController = new AgendaChefController();

agendaChefs.get("/agenda-chefs", asyncHandler(agendaChefController.buscarTodos));

agendaChefs.post("/agenda-chefs", asyncHandler(agendaChefController.cadastrar));

export default agendaChefs;
