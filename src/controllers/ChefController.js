import { AppDataSource } from "../config/database_postgres.js";
import { ChefEntity } from "../entidades/Chef.js";
import {
  CREATED_SUCCESS_REQUEST,
  SUCCESS_WITHOUT_RESPONSE,
} from "../constants/server.js";
import CreateUserService from "../services/users/CreateUserService.js";

const chefRepository = AppDataSource.getRepository(ChefEntity);
const createUserService = new CreateUserService();

class ChefController {
  async cadastrar(request, response) {
    const dados = request.body; // recuperar os valores vindo do body

    const chefCriado = await chefRepository.save(dados);
    await createUserService.create({
      nome: dados.nome,
      role: "chef",
      email: dados.email,
      senha: dados.senha,
    });

    response.status(CREATED_SUCCESS_REQUEST).send(chefCriado);
  }

  async buscarTodos(request, response) {
    const chefs = await chefRepository.find();
    response.send(chefs);
  }

  async buscarUm(request, response) {
    response.send(request.registro);
  }

  async atualizar(request, response) {
    const id = Number(request.params.id);
    const dados = request.body;

    // VALIDACAO

    await chefRepository.update(id, dados);
    const dadosChefAtualizado = await chefRepository.findOneBy({ id });
    response.send(dadosChefAtualizado);
  }

  async deletar(request, response) {
    const id = Number(request.params.id);
    const chefEncontrado = request.registro;

    if (chefEncontrado.faz_sobremesa === true) {
      response
        .status(409)
        .send({ error: "Chef nao pode ser deletado, pois faz sobremesa" });
    } else {
      await chefRepository.delete(id);
      response.status(SUCCESS_WITHOUT_RESPONSE).send();
    }
  }
}

export default ChefController;
