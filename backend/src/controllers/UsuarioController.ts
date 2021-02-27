import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsuariosRepository } from "../repositories/UsuariosRepository";

class UsuarioController {
    async index(req: Request, res: Response){
        const usuariosRepository = getCustomRepository(UsuariosRepository);

        const usuarios = await usuariosRepository.find();

        return res.json(usuarios);
        
    }

    async create(req: Request, res: Response){
        const { nome, email } = req.body;

        const usuariosRepository = getCustomRepository(UsuariosRepository);

        const usuarioExistente = await usuariosRepository.findOne({
            email
        });

        if(usuarioExistente){
            return res.status(400).json({
                error: "Usuário já cadastrado"
            });
        }

        const usuario = usuariosRepository.create({
            nome,
            email
        });

        await usuariosRepository.save(usuario);

        return res.status(201).json(usuario);
    }

    async show(req: Request, res: Response){
        
    }

    async update(req: Request, res: Response){
        
    }

    async delete(req: Request, res: Response){
        
    }
}

export default new UsuarioController();