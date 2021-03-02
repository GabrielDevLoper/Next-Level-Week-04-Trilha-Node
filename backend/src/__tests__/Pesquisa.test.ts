import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

interface Pesquisa {
    id: string;
}

describe("Pesquisas", () => {
    let id: string;

    beforeAll( async() => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = await createConnection();
        connection.dropDatabase();
        connection.close();
    });

    it("criando uma nova pesquisa", async () => {
        const response = await request(app).post("/pesquisas")
        .send({
            titulo: "pesquisa teste",
            descricao: "teasdasdsa"
        });

        id = response.body.id;

        expect(response.status).toBe(201)
    });

    it("filtrando uma nova pesquisa", async () => {
        const response = await request(app).get(`/pesquisas/${id}`);
        
        expect(response.status).toBe(200)
    });

});