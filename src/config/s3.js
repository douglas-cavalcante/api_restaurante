import "dotenv/config";

import { S3Client } from "@aws-sdk/client-s3";

export const S3_BUCKET = process.env.AWS_S3_BUCKET;

// As credenciais (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY) sao lidas
// automaticamente do ambiente pelo SDK, nao precisa passar aqui.
export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});
