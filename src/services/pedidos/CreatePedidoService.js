import { AppDataSource } from "../../config/database_postgres.js";
import { CONFLICT_ERROR } from "../../constants/server.js";

import { MesaEntity } from "../../entidades/Mesa.js";
import { PedidoEntity } from "../../entidades/Pedido.js";

import { AppError } from "../../errors/AppError.js";

const pedidoRepository = AppDataSource.getRepository(PedidoEntity);
const mesaRepository = AppDataSource.getRepository(MesaEntity);

class CreatePedidoService {
  async create(dados) {
    const mesa = await mesaRepository.findOneBy({ id: dados.mesa_id });

    if (mesa.reservado === true) {
      throw new AppError("A mesa já está reservada", CONFLICT_ERROR);
    } else {
      const novoPedido = await pedidoRepository.save(dados);
      await mesaRepository.update(dados.mesa_id, { reservado: true });
      return novoPedido;
    }
  }
}

export default CreatePedidoService;
