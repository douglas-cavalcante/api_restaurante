import "dotenv/config";

import { SESv2Client } from "@aws-sdk/client-sesv2";

// remetente padrao (precisa estar verificado no SES)
export const SES_FROM_EMAIL = process.env.AWS_SES_FROM_EMAIL;

// As credenciais (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY) sao lidas
// automaticamente do ambiente pelo SDK, nao precisa passar aqui.
export const sesClient = new SESv2Client({
  region: process.env.AWS_SES_REGION || process.env.AWS_REGION,
});
