import { Router } from "express";
import EnvioEmailController from "./controllers/EnvioEmailController";
import PesquisaController from "./controllers/PesquisaController";
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



export default routes;