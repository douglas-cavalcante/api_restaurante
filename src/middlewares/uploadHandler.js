import multer from "multer";
import { BAD_REQUEST_ERROR } from "../constants/server.js";
import { AppError } from "../errors/AppError.js";

const TAMANHO_MAXIMO = 10 * 1024 * 1024; // 10 MB

// mantem o arquivo em memoria (buffer) para enviar direto ao S3, sem salvar em disco
export const uploadHandler = (tiposPermitidos) =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: TAMANHO_MAXIMO },
    fileFilter: (request, file, callback) => {
      if (!tiposPermitidos.includes(file.mimetype)) {
        return callback(
          new AppError(
            `Tipo de arquivo não permitido. Use: ${tiposPermitidos.join(", ")}`,
            BAD_REQUEST_ERROR,
          ),
        );
      }
      callback(null, true);
    },
  });
