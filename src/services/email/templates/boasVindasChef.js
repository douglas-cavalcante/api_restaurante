// escapa caracteres especiais para nao quebrar o html com dados do usuario
function escapar(valor = "") {
  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// gera o html do email de boas vindas do chef
// usa tabelas e estilos inline para funcionar bem nos clientes de email (Gmail, Outlook...)
export function boasVindasChefHtml({ nome }) {
  const nomeSeguro = escapar(nome);
  const ano = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bem-vindo ao Sabor &amp; Arte</title>
</head>
<body style="margin:0;padding:0;background-color:#f4ede4;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4ede4;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.08);">

          <!-- cabecalho -->
          <tr>
            <td align="center" style="background-color:#7a1f1f;padding:40px 24px 32px;">
              <div style="font-size:44px;line-height:1;">&#127859;</div>
              <h1 style="margin:16px 0 4px;color:#ffffff;font-size:30px;font-weight:normal;letter-spacing:1px;">
                Sabor <span style="color:#e8b04b;">&amp;</span> Arte
              </h1>
              <p style="margin:0;color:#f1d9b5;font-size:13px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">
                Restaurante
              </p>
            </td>
          </tr>

          <!-- faixa dourada -->
          <tr>
            <td style="height:4px;background-color:#e8b04b;line-height:4px;font-size:0;">&nbsp;</td>
          </tr>

          <!-- conteudo -->
          <tr>
            <td style="padding:40px 40px 16px;color:#3b2f2f;">
              <h2 style="margin:0 0 20px;font-size:24px;font-weight:normal;color:#7a1f1f;">
                Seja muito bem-vindo, ${nomeSeguro}!
              </h2>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
                O restaurante <strong>Sabor &amp; Arte</strong> tem o prazer de recebê-lo como nosso
                colaborador.
              </p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
                A partir de agora, sua criatividade e seu talento fazem parte da nossa cozinha.
                Estamos ansiosos para criar, junto com você, pratos que encantem nossos clientes.
              </p>
            </td>
          </tr>

          <!-- citacao -->
          <tr>
            <td style="padding:8px 40px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fbf6ef;border-left:4px solid #e8b04b;border-radius:6px;">
                <tr>
                  <td style="padding:20px 24px;font-style:italic;font-size:17px;color:#5a4636;line-height:1.6;">
                    &ldquo;Cozinhar é uma arte, e todo chef é um artista.&rdquo;
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- assinatura -->
          <tr>
            <td style="padding:0 40px 40px;color:#3b2f2f;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;">
              Com carinho,<br />
              <strong style="color:#7a1f1f;">Equipe Sabor &amp; Arte</strong>
            </td>
          </tr>

          <!-- rodape -->
          <tr>
            <td align="center" style="background-color:#2b1d1d;padding:24px;color:#b9a99a;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;">
              &copy; ${ano} Restaurante Sabor &amp; Arte. Todos os direitos reservados.<br />
              Este é um e-mail automático, por favor não responda.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// versao em texto puro, usada por clientes que nao exibem html
export function boasVindasChefTexto({ nome }) {
  return `Seja muito bem-vindo, ${nome}!

O restaurante Sabor & Arte tem o prazer de recebê-lo como nosso colaborador.

A partir de agora, sua criatividade e seu talento fazem parte da nossa cozinha.
Estamos ansiosos para criar, junto com você, pratos que encantem nossos clientes.

Com carinho,
Equipe Sabor & Arte`;
}
