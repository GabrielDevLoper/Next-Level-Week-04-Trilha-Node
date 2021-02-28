import { EntityRepository, Repository } from "typeorm";
import { PesquisaUsuario } from "../models/PesquisaUsuario";

@EntityRepository(PesquisaUsuario)
class PesquisaUsuarioRepository extends Repository<PesquisaUsuario>{

}

export { PesquisaUsuarioRepository } ;