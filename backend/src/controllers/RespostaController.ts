import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import {AppError} from "../errors/AppError";
import { PesquisaUsuarioRepository } from "../repositories/PesquisaUsuarioRepository";

class RespostaController {
    async execute(req: Request, res: Response){
        const { nota } = req.params;
        const { u } = req.query;

        const pesquisaUsuarioRepository = getCustomRepository(PesquisaUsuarioRepository);

        const pesquisaUsuarioExiste = await pesquisaUsuarioRepository.findOne({
            where: {
                id: String(u)
            },
            relations: ["usuario"]
        });

        if(!pesquisaUsuarioExiste) {
            throw new AppError("A pesquisa do usuário não existe", 401);
        }

        pesquisaUsuarioExiste.valor = Number(nota);

        await pesquisaUsuarioRepository.save(pesquisaUsuarioExiste);

        return res.json({
            message: "nota recebida com sucesso",  
            pesquisa: pesquisaUsuarioExiste 
        });
    }
}

export default new RespostaController();