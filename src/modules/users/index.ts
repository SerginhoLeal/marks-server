import { FastifyInstance } from "fastify";

import crypto from 'node:crypto';

import { knex } from "../../database";
import { generateToken } from "../../middleware";
import { CreateUserProps } from "./interface";

export const User = {
  login: async(app: FastifyInstance) => app.post('/login-user', async(request, reply) => {
    const { cpf, password } = request.body as CreateUserProps;

    return await knex('users')
      .where({ cpf, password })
      .first()
      .then((response: any) =>
        reply
        .status(201)
        // .cookie('session_id', response.id, { path: '/', maxAge: 1000 * 60 * 60 * 24 * 7 })
        .cookie('token', generateToken({ id: response.id }))
        .send(response)
      )
      .catch(err => reply.status(400).send({ error: err, message: 'User Not Found' }))
  }),
  create: async(app: FastifyInstance) => app.post('/register-user', async(request, reply) => {
    const { name, email, password, repeat_password, cpf } = request.body as CreateUserProps;
    // let sessionId = request.cookies.sessionId;

    // if(!sessionId){
    //   sessionId = crypto.randomUUID();

    //   reply.cookie('sessionId', sessionId, {
    //     path: '/',
    //     maxAge: 1000 * 60 * 60 * 24 * 7
    //     /**
    //      * @name 1000_one_milliseconds;
    //      * @name 60_one_minute;
    //      * @name 60_one_hours;
    //      * @name 24_one_days;
    //      * @name 7_seven_days;
    //      */
    //   })
    // }

    // const example = {
    //   token: null,
    //   user: null,
    // };

    return knex('users').insert({
      id: crypto.randomUUID(),
      name,
      email,
      password,
      cpf
    })
      .then((response) => reply.status(201).send({ message: response }))
      // .catch((err) => reply.status(400).send({ error: err }))
  })
}