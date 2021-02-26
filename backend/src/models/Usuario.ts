import { Column, CreateDateColumn, Entity, PrimaryColumn,  } from "typeorm";
import { v4 as uuid} from "uuid";

@Entity("usuarios")
class Usuario {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    // Constructor criado para quando for uma edição do usuário
    constructor () {
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Usuario };