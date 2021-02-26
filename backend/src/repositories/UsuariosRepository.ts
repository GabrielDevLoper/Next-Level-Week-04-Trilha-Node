import { EntityRepository, Repository } from "typeorm";
import { Usuario } from "../models/Usuario";

@EntityRepository(Usuario)
class UsuariosRepository extends Repository<Usuario> {

}

export { UsuariosRepository };