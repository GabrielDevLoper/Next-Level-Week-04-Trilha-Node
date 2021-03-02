import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { PesquisaRepository } from "../repositories/PesquisaRepository";
import * as yup from 'yup';


class PesquisaServices {
    async listar(req: Request, res: Response){
        const pesquisaRepository = getCustomRepository(PesquisaRepository);

        const pesquisas = await pesquisaRepository.find();

        return res.json(pesquisas);
    }

    async salvar(req: Request, res: Response){
        const { titulo, descricao } = req.body;

        let schema = yup.object().shape({
            titulo: yup.string().required("Titulo é obrigatório"),
            descricao: yup.string().required("Descrição é obrigatório"),
        });

        try {
            await schema.validate(req.body);
        } catch (error) {
            throw new AppError(error, 400);
        }

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