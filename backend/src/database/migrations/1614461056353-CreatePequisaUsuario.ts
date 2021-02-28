import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePequisaUsuario1614461056353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pesquisas_usuarios",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "id_usuario",
                        type: "uuid",
                        
                    },
                    {
                        name: "id_pesquisa",
                        type: "uuid", 
                    },
                    {
                        name: "valor",
                        type: "number", 
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                     {
                         name: "FK_USUARIO",
                         referencedTableName: "usuarios",
                         referencedColumnNames: ["id"],
                         columnNames: ["id_usuario"],
                         onDelete: "CASCADE",
                         onUpdate: "CASCADE"
                     },
                     {
                        name: "FK_PESQUISA",
                        referencedTableName: "pesquisas",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_pesquisa"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pesquisas_usuarios");

    }

}
