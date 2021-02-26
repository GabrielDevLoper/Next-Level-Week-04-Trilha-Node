import { Router } from "express";

import UsuarioController from "./controllers/UsuarioController";

const routes = Router();

//Rotas de usuários
routes.get("/usuarios", UsuarioController.index);
routes.post("/usuarios", UsuarioController.create);


export default routes;