import { SendEmailCommand } from "@aws-sdk/client-sesv2";

import { sesClient, SES_FROM_EMAIL } from "../../config/ses.js";
import { AppError } from "../../errors/AppError.js";

// aceita "a@x.com" ou ["a@x.com", "b@x.com"] e sempre devolve um array
function paraLista(valor) {
  if (!valor) return [];
  return Array.isArray(valor) ? valor : [valor];
}

class SesEmailService {
  // envia um email e retorna o MessageId gerado pelo SES
  // ex: await sesEmailService.enviar({ para: "cliente@x.com", assunto: "Oi", html: "<b>Oi</b>" })
  async enviar({ para, assunto, html, texto, cc, cco, responderPara, de }) {
    const destinatarios = paraLista(para);

    if (destinatarios.length === 0) {
      throw new AppError("Informe ao menos um destinatario", 400);
    }

    if (!assunto) {
      throw new AppError("Informe o assunto do email", 400);
    }

    if (!html && !texto) {
      throw new AppError("Informe o conteudo do email (html ou texto)", 400);
    }

    const body = {};
    if (html) body.Html = { Data: html, Charset: "UTF-8" };
    if (texto) body.Text = { Data: texto, Charset: "UTF-8" };

    const resultado = await sesClient.send(
      new SendEmailCommand({
        FromEmailAddress: de || SES_FROM_EMAIL,
        Destination: {
          ToAddresses: destinatarios,
          CcAddresses: paraLista(cc),
          BccAddresses: paraLista(cco),
        },
        ReplyToAddresses: paraLista(responderPara),
        Content: {
          Simple: {
            Subject: { Data: assunto, Charset: "UTF-8" },
            Body: body,
          },
        },
      }),
    );

    return resultado.MessageId;
  }

  // envia usando um template cadastrado no SES, substituindo as variaveis {{nome}}
  // ex: await sesEmailService.enviarTemplate({ para: "x@x.com", template: "PedidoFechado", dados: { total: 50 } })
  async enviarTemplate({ para, template, dados = {}, cc, cco, responderPara, de }) {
    const destinatarios = paraLista(para);

    if (destinatarios.length === 0) {
      throw new AppError("Informe ao menos um destinatario", 400);
    }

    if (!template) {
      throw new AppError("Informe o nome do template", 400);
    }

    const resultado = await sesClient.send(
      new SendEmailCommand({
        FromEmailAddress: de || SES_FROM_EMAIL,
        Destination: {
          ToAddresses: destinatarios,
          CcAddresses: paraLista(cc),
          BccAddresses: paraLista(cco),
        },
        ReplyToAddresses: paraLista(responderPara),
        Content: {
          Template: {
            TemplateName: template,
            TemplateData: JSON.stringify(dados),
          },
        },
      }),
    );

    return resultado.MessageId;
  }
}

export default SesEmailService;
