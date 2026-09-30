import { AppDataSource } from "../config/database_postgres.js";
import { PedidoEntity } from "../entidades/Pedido.js";
import { MesaEntity } from "../entidades/Mesa.js";
import {
  CREATED_SUCCESS_REQUEST,
  NOT_FOUND_ERROR,
} from "../constants/server.js";
import CreatePedidoService from "../services/pedidos/CreatePedidoService.js";

const pedidoRepository = AppDataSource.getRepository(PedidoEntity);
const mesaRepository = AppDataSource.getRepository(MesaEntity);

const createPedidoService = new CreatePedidoService();

class PedidoController {
  async fechar(request, response) {
    const idPedido = Number(request.params.id);
    const pedidoEncontrado = request.registro;

    // Somar todos os items do pedido
    const resultado = await AppDataSource.createQueryBuilder()
      .select("SUM(total_item)", "total")
      .from((subQuery) => {
        return subQuery
          .select("ic.nome", "nome")
          .addSelect("ip.quantidade * ic.preco", "total_item")
          .from("items_pedidos", "ip")
          .innerJoin("items_cardapio", "ic", "ip.item_cardapio_id = ic.id")
          .where("ip.pedido_id = :pedidoId", { pedidoId: idPedido });
      }, "pedido_items")
      .getRawOne();

    // Ir na tabela de pedidos e atualizar a coluna total e fechado para true
    await pedidoRepository.update(idPedido, {
      fechado: true,
      total: resultado.total || 0, // se valor for null, assume valor 0 para salvar no banco
    });

    // Ir na tabela de mesas e atualiza e liberar mesa(reservado = false)
    await mesaRepository.update(pedidoEncontrado.mesa_id, {
      reservado: false,
    });

    response.send(resultado);
  }

  async cadastrar(request, response) {
    const dados = request.body;

    const novoPedido = await createPedidoService.create(dados);

    response.status(CREATED_SUCCESS_REQUEST).send(novoPedido);
  }

  async buscarTodos(request, response) {
    const todosPedidos = await pedidoRepository.find({
      relations: { mesa: true, items: { itemCardapio: true } },
    });
    response.send(todosPedidos);
  }

  async buscarUm(request, response) {
    const pedidoEncontrado = await pedidoRepository.findOne({
      where: { id: Number(request.params.id) },
      relations: { mesa: true, items: { itemCardapio: true } },
    });

    if (!pedidoEncontrado) {
      response
        .status(NOT_FOUND_ERROR)
        .send({ error: "Nao foi encontrado pedido com esse Id" });
      return;
    }

    const subTotal = pedidoEncontrado.items.reduce((acc, currentItem) => {
      const subTotal =
        Number(currentItem.itemCardapio.preco) * currentItem.quantidade;
      return subTotal + acc;
    }, 0);

    response.send({ ...pedidoEncontrado, subTotal });
  }
}

export default PedidoController;
