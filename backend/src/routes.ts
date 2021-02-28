import { Router } from "express";
import EnvioEmailController from "./controllers/EnvioEmailController";
import NpsController from "./controllers/NpsController";
import PesquisaController from "./controllers/PesquisaController";
import RespostaController from "./controllers/RespostaController";
import UsuarioController from "./controllers/UsuarioController";


const routes = Router();

//Rotas de usuários
routes.get("/usuarios", UsuarioController.index);
routes.post("/usuarios", UsuarioController.create);

//Rotas de pesquisas
routes.post("/pesquisas", PesquisaController.create);
routes.get("/pesquisas", PesquisaController.index);

//Rotas para envio de emails
routes.post("/envio-email", EnvioEmailController.execute);

//Rotas para o envio das respostas feita pelo usuario a partir do email recebido
routes.get("/respostas/:nota", RespostaController.execute);

//Rotas nps
routes.get("/nps/:id_pesquisa", NpsController.execute);



export default routes;