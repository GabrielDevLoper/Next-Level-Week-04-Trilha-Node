import { getCustomRepository } from "typeorm";
import { UsuariosRepository } from "../repositories/UsuariosRepository";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";
import { Request, Response } from "express";

class UsuarioServices {
    async listar(req: Request, res: Response){
        const usuariosRepository = getCustomRepository(UsuariosRepository);

        const usuarios = await usuariosRepository.find();

        return res.json(usuarios);  
    }

    async salvar(req: Request, res: Response) {
        const { nome, email } = req.body;
        
        let schema = yup.object().shape({
            nome: yup.string().required("Nome é obrigatorio"),
            email: yup.string().email("Tipo de email inválido").required("Email obrigatorio"),
        });

        try {
            await schema.validate(req.body);
        } catch (error) {
            throw new AppError(error, 400);
        }
        
        const usuariosRepository = getCustomRepository(UsuariosRepository);

        const usuarioExistente = await usuariosRepository.findOne({
            email
        });

        if(usuarioExistente){
            throw new AppError("Usuário já cadastrado", 400);
        }

        const usuario = usuariosRepository.create({
            nome,
            email
        });

        await usuariosRepository.save(usuario);

        return res.status(201).json(usuario);
    }

    async buscarUnico(req: Request, res: Response) {
        const { id } = req.params;

        const usuariosRepository = getCustomRepository(UsuariosRepository);

        const usuario = await usuariosRepository.findOneOrFail({
            where: {
                id
            }
        });

        if(!usuario) {
            throw new AppError("Usuário não existe", 400);
        }

        return res.json(usuario);
    }

    async atualizar(req: Request, res: Response) {
        const { nome, email } = req.body;
        const { id } = req.params;

        const usuariosRepository = getCustomRepository(UsuariosRepository);

        const usuario = await usuariosRepository.findOneOrFail({
            where: {
                id
            }
        });

        if(!usuario) {
            throw new AppError("Usuário não existe", 400);
        }

        usuario.nome = nome;
        usuario.email = email;


        await usuariosRepository.save(usuario);

        return res.status(200).json({message: "Usuário alterado com sucesso!"});

        
    }

    async deletar(req: Request, res: Response){
        const { id } = req.params;

        const usuariosRepository = getCustomRepository(UsuariosRepository);

        const usuario = await usuariosRepository.findOne({
            where: {
                id
            }
        });

        if(!usuario) {
            throw new AppError("Usuário não existe", 400);
        }

        await usuariosRepository.delete(usuario.id);

        return res.status(200).json({message: "Usuário deletado com sucesso!"});
    }
}

export default new UsuarioServices();