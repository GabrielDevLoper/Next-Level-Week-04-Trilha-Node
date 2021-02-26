import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid} from "uuid";

@Entity("pesquisas")
class Pesquisa {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}


export { Pesquisa };