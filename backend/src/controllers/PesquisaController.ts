import { Request, Response } from "express";
import PesquisaServices from "../services/PesquisaServices";

class PesquisaController {
    async index(req: Request, res: Response){
        await PesquisaServices.listar(req, res);
    }

    async create(req: Request, res: Response){
        await PesquisaServices.salvar(req, res);
    }

    async show(req: Request, res: Response){
        await PesquisaServices.buscarUnico(req, res);
    }


}

export default new PesquisaController();