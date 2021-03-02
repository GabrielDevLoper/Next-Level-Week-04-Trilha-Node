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

    async atualizar(req: Request, res: Response){
        const { titulo, descricao } = req.body;
        const { id } = req.params;

        const pesquisaRepository = getCustomRepository(PesquisaRepository);

        const pesquisa = await pesquisaRepository.findOne({id});

        if(!pesquisa){
            throw new AppError("A pesquisa que você deseja alterar não existe", 404);
        }

        pesquisa.titulo = titulo;
        pesquisa.descricao = descricao;

        await pesquisaRepository.save(pesquisa);

        return res.status(200).json(pesquisa);
    }

    async delete(req: Request, res: Response){
        const { id } = req.params;

        const pesquisaRepository = getCustomRepository(PesquisaRepository);

        const pesquisa = await pesquisaRepository.findOne({id});

        if(!pesquisa){
            throw new AppError("A pesquisa que você deseja excluir não existe", 404);
        }

        await pesquisaRepository.remove(pesquisa);

        return res.status(200).json({
            message: "Pesquisa deletada com sucesso"
        });
    }
}


export default new PesquisaServices();