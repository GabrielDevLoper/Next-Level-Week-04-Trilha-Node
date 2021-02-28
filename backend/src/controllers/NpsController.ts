import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { PesquisaUsuarioRepository } from "../repositories/PesquisaUsuarioRepository";

class NpsController {
    async execute(req: Request, res: Response){
        const { id_pesquisa } = req.params;
        
        const pesquisaUsuarioRepository = getCustomRepository(PesquisaUsuarioRepository);

        const pesquisaUsuario = await pesquisaUsuarioRepository.find({
            id_pesquisa,
            valor: Not(IsNull()),
        });

        const detractor = pesquisaUsuario.filter(
            pesquisa => pesquisa.valor >= 0 && pesquisa.valor <= 6 
        ).length;

        const passivos = pesquisaUsuario.filter(
            pesquisa => pesquisa.valor >= 7 && pesquisa.valor <= 8 
        ).length;

        const promotores = pesquisaUsuario.filter(
            pesquisa => pesquisa.valor >= 9 && pesquisa.valor <= 10
        ).length;

        const totalRespostas = pesquisaUsuario.length;

        const calcular = (((promotores - detractor) / totalRespostas) * 100).toFixed(2);

        return res.json({
            detractor,
            promotores,
            passivos,
            totalRespostas,
            nps: Number(calcular),
        },)
    }
}

export default new NpsController();