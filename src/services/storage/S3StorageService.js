import { randomUUID } from "node:crypto";
import path from "node:path";

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3Client, S3_BUCKET } from "../../config/s3.js";

class S3StorageService {
  // envia o arquivo recebido pelo multer e retorna a chave (caminho) dele no bucket
  async upload(file, pasta) {
    const extensao = path.extname(file.originalname).toLowerCase();
    const key = `${pasta}/${randomUUID()}${extensao}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return key;
  }

  // gera um link temporario para acessar o arquivo (bucket continua privado)
  async gerarUrlTemporaria(key, expiraEmSegundos = 3600) {
    return getSignedUrl(
      s3Client,
      new GetObjectCommand({ Bucket: S3_BUCKET, Key: key }),
      { expiresIn: expiraEmSegundos },
    );
  }

  async remover(key) {
    await s3Client.send(
      new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: key }),
    );
  }
}

export default S3StorageService;
