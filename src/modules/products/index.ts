import { FastifyInstance } from "fastify";

import crypto from 'node:crypto';

import { knex } from "../../database";
import { checkSessionIdExists, checkTokenAuthExist } from "../../middleware";
import { CreateProductsProps } from "./interface";

export const Products = {
  get: async(app: FastifyInstance) => app.get('/products', { preHandler: [checkTokenAuthExist] }, async (request, reply) => {
    const products = await knex('products')
      .select('*')
      .then(res => res.map(data => ({
          ...data,
          gender: JSON.parse(data.gender),
          color: JSON.parse(data.color),
          category: JSON.parse(data.category),
          image: JSON.parse(data.image),
        })
      ))

    return products;
  }),

  post: async(app: FastifyInstance) =>
    app.post('/products', { preHandler: [checkSessionIdExists, checkTokenAuthExist] }, async(request, reply) => {
      const { title, price, material, description, color, image, gender, category } = request.body as CreateProductsProps;
      const { session_id, token } = request.cookies;

      return knex('products').insert({
        id: crypto.randomUUID(),
        user_id: request.user_id,
        search_code: '00001',
        title,
        price,
        color: JSON.stringify(color),
        image: JSON.stringify(image),
        gender: JSON.stringify(gender),
        category: JSON.stringify(category),
        material,
        session_id,
        description,
      })
        .then(() => reply.status(201).send())
        .catch((err) => reply.status(400).send({ error: err }))
    }),

  update: async(app: FastifyInstance) =>
    app.put('/products', { preHandler: [checkSessionIdExists, checkTokenAuthExist] }, async(request, reply) => {
      const { id } = request.query as { id: string };
      const update = request.body as CreateProductsProps;

      return knex('products')
        .where({ id })
        .update({ ...update })
        .then(() => reply.status(201).send())
        .catch((err) => reply.status(400).send({ error: err }))
    }),

  delete: async(app: FastifyInstance) =>
    app.delete('/products', { preHandler: [checkSessionIdExists] }, async(request, reply) => {
      const { id } = request.query as { id: string };
      return knex('products')
        .where({ id })
        .del()
        .then(() => reply.status(201).send())
        .catch((err) => reply.status(400).send({ error: err }))
    })
}