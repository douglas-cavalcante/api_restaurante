import bcrypt from "bcrypt";

import { AppDataSource } from "../../config/database_postgres.js";
import { UsuarioEntity } from "../../entidades/Usuario.js";
import { CONFLICT_ERROR } from "../../constants/server.js";
import { AppError } from "../../errors/AppError.js";

const usuarioRepository = AppDataSource.getRepository(UsuarioEntity);

class CreateUserService {
  async create(dados) {
    const usuarioEncontrado = await usuarioRepository.existsBy({
      email: dados.email,
    });

    if (usuarioEncontrado) {
      throw new AppError("O email já existe", CONFLICT_ERROR);
    } else {
      const senhaHash = await bcrypt.hash(dados.senha, 12);

      const dadosUsuario = {
        nome: dados.nome,
        email: dados.email,
        senha: senhaHash,
        role: dados.role,
      };

      await usuarioRepository.save(dadosUsuario);

      return { nome: dados.nome, role: dados.role };
    }
  }
}

export default CreateUserService;
