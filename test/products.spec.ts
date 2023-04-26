import { expect, test, beforeAll, afterAll, describe, it, beforeEach } from "vitest";
import request from "supertest";
import { execSync } from "node:child_process";
import { app } from "../src/app";

describe('Products routes', () => {
  beforeAll(async() => await app.ready());
  afterAll(async() => await app.close());

  beforeEach(() => {
    execSync('yarn knex migrate:rollback --all')
    execSync('yarn knex migrate:latest')
  })

  it('should be able to create a new user', async() => {
    await request(app.server)
      .post('/api/register-user')
      .send({
        name: "Name Test",
        email: "test@gmail.com",
        password: "test",
        repeat_password: "test",
        cpf: 99999999999
      })
      .expect(201)
  });

  // it('should be able to login', async() => {
  //   await request(app.server)
  //     .post('/api/register-user')
  //     .send({ name: "Name Test", email: "test@gmail.com", password: "test", repeat_password: "test", cpf: 99999999999 });

  //   await request(app.server)
  //     .post('/api/login-user')
  //     .send({ cpf: 99999999999, password: 'test' })
  //     .expect(201)
  // });

  it('should be able to create a new product', async() => {
    await request(app.server)
      .post('/api/register-user')
      .send({ name: "Name Test", email: "test@gmail.com", password: "test", repeat_password: "test", cpf: 99999999999 });

    const loginUser = await request(app.server)
      .post('/api/login-user')
      .send({ cpf: 99999999999, password: 'test' })

    const cookies: any = loginUser.get('Set-Cookie');

    await request(app.server)
      .post('/api/products')
      .set('Cookie', cookies)
      .send({
        title: "New Product",
        user_id: cookies[0].session_id,
        session_id: cookies[0].session_id,
        description: "New Product Description",
        price: 300.00,
        color: JSON.stringify(["rosa", "preto"]),
        image : JSON.stringify([
          "/image/upload/v1682166752/cut_it/TAM_ngzjkx.webp",
          "/image/upload/v1682166762/cut_it/TAM_hs8kwk.webp",
          "/image/upload/v1682166773/cut_it/TAM_qhsyfm.webp",
          "/image/upload/v1682166778/cut_it/TAM_h38cfn.jpgs"
        ]),
        gender: JSON.stringify(["M", "F"]),
        material: "Zirconia",
        category: JSON.stringify(["anel", "alianca"])
      })
      .expect(201)
  });
});
