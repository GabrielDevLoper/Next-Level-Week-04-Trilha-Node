import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PesquisaRepository } from "../repositories/PesquisaRepository";
import { PesquisaUsuarioRepository } from "../repositories/PesquisaUsuarioRepository";
import { UsuariosRepository } from "../repositories/UsuariosRepository";
import EnvioEmailServices from "../services/EnvioEmailServices";
import path from 'path';


class EnvioEmailController {
    async execute(req: Request, res: Response){
        const { email, id_pesquisa } = req.body;

        const usuariosRepository = getCustomRepository(UsuariosRepository);
        const pesquisaRepository = getCustomRepository(PesquisaRepository);
        const pesquisaUsuarioRepository = getCustomRepository(PesquisaUsuarioRepository);

        const usuarioExiste = await usuariosRepository.findOne({
            email
        });

        if(!usuarioExiste) {
            return res.status(401).json({error: "Usuário não existe !"});
        }

        const pesquisaExiste = await pesquisaRepository.findOne({id: id_pesquisa});

        if(!pesquisaExiste) {
            return res.status(401).json({error: "Pesquisa não existe !"});
        }

        const npsPath = path.resolve(__dirname, '..', 'views', 'emails', 'npsEmail.hbs');

        const variaveis = {
            nome: usuarioExiste.nome,
            titulo: pesquisaExiste.titulo,
            descricao: pesquisaExiste.descricao,
            id_usuario: usuarioExiste.id,
            link: process.env.URL_EMAIL,
        }

        const pesquisaUsuarioExiste = await pesquisaUsuarioRepository.findOne({
            where: {
                id_usuario: usuarioExiste.id,
                valor: null,
            },
            relations: ["usuario", "pesquisa"]
        });

        if(pesquisaUsuarioExiste){
            await EnvioEmailServices.execute(email, pesquisaExiste.titulo, variaveis, npsPath);

            return res.json(pesquisaUsuarioExiste);
        }

        // Salvar informações na tabela pesquisas_usuarios
        const pesquisaUsuario = pesquisaUsuarioRepository.create({
            id_usuario: usuarioExiste.id,
            id_pesquisa: pesquisaExiste.id
        });

        await pesquisaUsuarioRepository.save(pesquisaUsuario);
        
        await EnvioEmailServices.execute(email, pesquisaExiste.titulo, variaveis, npsPath);

        return res.status(201).json({message: "Pesquisa cadastrada"});

    }
}

export default new EnvioEmailController();