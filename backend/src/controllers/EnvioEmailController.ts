import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PesquisaRepository } from "../repositories/PesquisaRepository";
import { PesquisaUsuarioRepository } from "../repositories/PesquisaUsuarioRepository";
import { UsuariosRepository } from "../repositories/UsuariosRepository";
import EnvioEmailServices from "../services/EnvioEmailServices";
import path from 'path';
import { AppError } from "../errors/AppError";


class EnvioEmailController {
    async execute(req: Request, res: Response){
        const { email, id_pesquisa } = req.body;
        let id_pesquisa_usuario:string = "";

        const usuariosRepository = getCustomRepository(UsuariosRepository);
        const pesquisaRepository = getCustomRepository(PesquisaRepository);
        const pesquisaUsuarioRepository = getCustomRepository(PesquisaUsuarioRepository);

        const usuarioExiste = await usuariosRepository.findOne({
            email
        });

        if(!usuarioExiste) {
            throw new AppError("Usuário não existe !", 401);
            // return res.status(401).json({error: "Usuário não existe !"});
        }

        const pesquisaExiste = await pesquisaRepository.findOne({id: id_pesquisa});

        if(!pesquisaExiste) {
            throw new AppError("Pesquisa não existe !", 401);
            // return res.status(401).json({error: "Pesquisa não existe !"});
        }


        const npsPath = path.resolve(__dirname, '..', 'views', 'emails', 'npsEmail.hbs');

        const pesquisaUsuarioExiste = await pesquisaUsuarioRepository.findOne({
            where: {
                id_usuario: usuarioExiste.id,
                valor: null,
            },
            relations: ["usuario", "pesquisa"]
        });


        const variaveis = {
            nome: usuarioExiste.nome,
            titulo: pesquisaExiste.titulo,
            descricao: pesquisaExiste.descricao,
            id_pesquisa_usuario: "",
            link: process.env.URL_EMAIL,
        }

        if(pesquisaUsuarioExiste){
            variaveis.id_pesquisa_usuario = pesquisaUsuarioExiste.id;
            await EnvioEmailServices.execute(email, pesquisaExiste.titulo, variaveis, npsPath);
            return res.json(pesquisaUsuarioExiste);
        }

        // Salvar informações na tabela pesquisas_usuarios
        const pesquisaUsuario = pesquisaUsuarioRepository.create({
            id_usuario: usuarioExiste.id,
            id_pesquisa: pesquisaExiste.id
        });

        await pesquisaUsuarioRepository.save(pesquisaUsuario);

        variaveis.id_pesquisa_usuario = pesquisaUsuario.id;
        
        await EnvioEmailServices.execute(email, pesquisaExiste.titulo, variaveis, npsPath);

        return res.status(201).json({message: "Email enviado com sucesso"});

    }
}

export default new EnvioEmailController();