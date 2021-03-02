import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { PesquisaRepository } from "../repositories/PesquisaRepository";

class PesquisaServices {
    async listar(req: Request, res: Response){
        const pesquisaRepository = getCustomRepository(PesquisaRepository);

        const pesquisas = await pesquisaRepository.find();

        return res.json(pesquisas);
    }

    async salvar(req: Request, res: Response){
        const { titulo, descricao } = req.body;

        const pesquisaRepository = getCustomRepository(PesquisaRepository);

        const pesquisa = pesquisaRepository.create({
            titulo,
            descricao,
        });

        await pesquisaRepository.save(pesquisa);

        return res.status(201).json(pesquisa);
    }

    async buscarUnico(req: Request, res: Response){
        const { id } = req.params;

        const pesquisaRepository = getCustomRepository(PesquisaRepository);

        const pesquisa = await pesquisaRepository.findOneOrFail({
            where: {
                id
            }
        });

        if(!pesquisa) {
            throw new AppError("Usuário não existe", 400);
        }

        return res.json(pesquisa);
    }
}


export default new PesquisaServices();