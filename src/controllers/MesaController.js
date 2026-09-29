import { AppDataSource } from "../config/database_postgres.js";
import {
  BAD_REQUEST_ERROR,
  CREATED_SUCCESS_REQUEST,
} from "../constants/server.js";
import { MesaEntity } from "../entidades/Mesa.js";

const mesaRepository = AppDataSource.getRepository(MesaEntity);

class MesaController {
  async buscarTodos(request, response) {
    const mesas = await mesaRepository
      .createQueryBuilder("mesa")
      .leftJoin("mesa.pedido", "pedido", "pedido.fechado = false")
      .select([
        "mesa.id AS id",
        "mesa.nome AS nome",
        "mesa.reservado AS reservado",
        "mesa.quantidade_lugares AS quantidade_lugares",
        "mesa.criado_em AS criado_em",
        "mesa.atualizado_em AS atualizado_em",
        "pedido.id AS pedido_atual_id",
      ])
      .getRawMany();

    response.send(mesas);
  }

  async cadastrar(request, response) {
    const dados = request.body;

    if (!dados.nome || typeof dados.nome !== "string") {
      response.status(BAD_REQUEST_ERROR).send({ error: "Nome é obrigatório" });
    } else {
      const novaMesa = await mesaRepository.save(dados);

      response.status(CREATED_SUCCESS_REQUEST).send(novaMesa);
    }
  }
}

export default MesaController;
