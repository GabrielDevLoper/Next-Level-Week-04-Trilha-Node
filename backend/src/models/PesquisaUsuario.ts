import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid} from "uuid";
import { Pesquisa } from "./Pesquisa";
import { Usuario } from "./Usuario";

@Entity("pesquisas_usuarios")
class PesquisaUsuario {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    id_usuario: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "id_usuario" })
    usuario: Usuario;

    @Column()
    id_pesquisa: string;

    @ManyToOne(() => Pesquisa)
    @JoinColumn({ name: "id_pesquisa" })
    pesquisa: Pesquisa;

    @Column()
    valor: number;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}


export { PesquisaUsuario };