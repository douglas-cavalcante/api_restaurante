import { AppDataSource } from "../config/database_postgres.js";
import { CREATED_SUCCESS_REQUEST } from "../constants/server.js";
import { AgendaChefEntity } from "../entidades/AgendaChef.js";

const agendaChefRepository = AppDataSource.getRepository(AgendaChefEntity);

class AgendaChefController {
  async buscarTodos(request, response) {
    const agendas = await agendaChefRepository.find({
      relations: { chef: true },
    });
    response.send(agendas);
  }

  // chef_id, semana, mes, dias_semana
  async cadastrar(request, response) {
    const dados = request.body;
    // validação

    const agendaEncontrada = await agendaChefRepository.findOneBy({
      semana: dados.semana,
      mes: dados.mes,
      chef_id: dados.chef_id,
    });

    if (agendaEncontrada) {
      response.status(409).send({ error: "Ja tem uma agenda para o chef" });
    } else {
      const agendaCriada = await agendaChefRepository.save(dados);
      response.status(CREATED_SUCCESS_REQUEST).send(agendaCriada);
    }
  }
}

export default AgendaChefController;
