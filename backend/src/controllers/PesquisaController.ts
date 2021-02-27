import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PesquisaRepository } from "../repositories/PesquisaRepository";

class PesquisaController {
    async index(req: Request, res: Response){
        const pesquisaRepository = getCustomRepository(PesquisaRepository);

        const pesquisas = await pesquisaRepository.find();

        return res.json(pesquisas);
    }

    async create(req: Request, res: Response){
        const { titulo, descricao } = req.body;

        const pesquisaRepository = getCustomRepository(PesquisaRepository);

        const pesquisa = pesquisaRepository.create({
            titulo,
            descricao,
        });

        await pesquisaRepository.save(pesquisa);

        return res.status(201).json(pesquisa)
    }


}

export default new PesquisaController();