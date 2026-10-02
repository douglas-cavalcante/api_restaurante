import multer from "multer";
import {
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
} from "../constants/server.js";

export function errorHandler(error, request, response, next) {
  console.error(error);

  // erros de upload (ex: arquivo maior que o limite) sao erro do cliente
  if (error instanceof multer.MulterError) {
    return response.status(BAD_REQUEST_ERROR).send({ error: error.message });
  }

  response
    .status(error.status || INTERNAL_SERVER_ERROR)
    .send({ error: error.message || "Erro interno no servidor" });
}
