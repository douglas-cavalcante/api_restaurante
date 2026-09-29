import { AppDataSource } from "../config/database_postgres.js";
import { UsuarioEntity } from "../entidades/Usuario.js";
import {
  BAD_REQUEST_ERROR,
  CONFLICT_ERROR,
  CREATED_SUCCESS_REQUEST,
} from "../constants/server.js";

import jwt from "jsonwebtoken"; // lib que vai gerar o token do usuario
import bcrypt from "bcrypt";

const usuarioRepository = AppDataSource.getRepository(UsuarioEntity);

class AuthController {
  async login(request, response) {
    // 1 - Pegar o body e armezanar na variavel dados
    const dados = request.body;

    // 2 valida se o email ou senha são vazios
    if (!dados.email || !dados.senha) {
      response
        .status(BAD_REQUEST_ERROR)
        .send({ error: "email e senha são obrigatórios" });
      return;
    }

    // 3 - busca um usuário pelo email no banco
    const usuario = await usuarioRepository.findOneBy({ email: dados.email });

    // 4 - Se o usuário com base no email não foi encontrado, lança um erro
    if (!usuario) {
      response.status(BAD_REQUEST_ERROR).send({
        error: "Credenciais incorretas",
      });
      return;
    }

    // 5 - comparar se o hash da senha do usuario encontrado equivale a hash da senha recebida no body
    const senhaCorreta = await bcrypt.compare(dados.senha, usuario.senha);

    if (senhaCorreta) {
      const tokenUsuario = jwt.sign(
        { id: usuario.id, role: usuario.role },
        process.env.JWT_SECRET || "senai2026",
        {
          expiresIn: "24h",
        },
      );

      response.send({
        nome: usuario.nome,
        role: usuario.role,
        token: tokenUsuario,
      });
    } else {
      response.status(BAD_REQUEST_ERROR).send({
        error: "Credenciais incorretas",
      });
    }
  }

  async cadastrarUsuario(request, response) {
    const dados = request.body;

    // Fazer validação

    const usuarioEncontrado = await usuarioRepository.existsBy({
      email: dados.email,
    });

    if (usuarioEncontrado) {
      response.status(CONFLICT_ERROR).send({ error: "O email já existe" });
    } else {
      const senhaHash = await bcrypt.hash(dados.senha, 12);

      // criar um novo objeto apartir do body com senha alterada
      const dadosUsuario = {
        nome: dados.nome,
        email: dados.email,
        senha: senhaHash,
        role: dados.role,
      };

      /* Forma alternativa usando operador spread
      const dadosUsuario = {
        ...dados,
        senha: senhaHash,
      };
      */

      await usuarioRepository.save(dadosUsuario);

      response
        .status(CREATED_SUCCESS_REQUEST)
        .send({ nome: dados.nome, role: dados.role });
    }
  }
}

export default AuthController;
