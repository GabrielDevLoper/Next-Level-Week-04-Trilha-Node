import { Router } from "express";
import PesquisaController from "./controllers/PesquisaController";

import UsuarioController from "./controllers/UsuarioController";

const routes = Router();

//Rotas de usuários
routes.get("/usuarios", UsuarioController.index);
routes.post("/usuarios", UsuarioController.create);

//Rotas de pesquisas
routes.post("/pesquisas", PesquisaController.create);
routes.get("/pesquisas", PesquisaController.index);



export default routes;