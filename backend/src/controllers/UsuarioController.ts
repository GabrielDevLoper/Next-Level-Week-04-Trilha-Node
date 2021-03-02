import { Request, Response } from "express";
import UsuarioServices from "../services/UsuarioServices";

class UsuarioController {
    async index(req: Request, res: Response){
        await UsuarioServices.listar(req, res); 
    }

    async create(req: Request, res: Response){
        await UsuarioServices.salvar(req, res);
    }

    async show(req: Request, res: Response){
        await UsuarioServices.buscarUnico(req, res);
    }

    async update(req: Request, res: Response){
        await UsuarioServices.atualizar(req, res);
    }

    async delete(req: Request, res: Response){
        await UsuarioServices.deletar(req, res);
    }
}

export default new UsuarioController();