import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Usuarios", () => {
    beforeAll( async() => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    it("criando um novo usuario", async () => {
        const response = await request(app).post("/usuarios")
        .send({
            nome: "user",
            email: "user@gmail.com"
        });

        expect(response.status).toBe(201)
    });

    it("usuario não poderá ser cadastrado com o mesmo email", async () => {
        const response = await request(app).post("/usuarios")
        .send({
            nome: "user",
            email: "user@gmail.com"
        });

        expect(response.status).toBe(400);
    });

    it("listando todos os usuarios", async () => {
        const response = await request(app).get("/usuarios");

        expect(response.body.length).toBe(1);
    })
})