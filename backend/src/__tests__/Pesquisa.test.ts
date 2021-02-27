import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Pesquisas", () => {
    beforeAll( async() => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    it("criando uma nova pesquisa", async () => {
        const response = await request(app).post("/pesquisas")
        .send({
            titulo: "pesquisa teste",
            descricao: "teasdasdsa"
        });

        expect(response.status).toBe(201)
    });

})