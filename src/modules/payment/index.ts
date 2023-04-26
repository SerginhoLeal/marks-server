import { FastifyInstance } from "fastify";
import crypto from 'node:crypto';

import { knex } from "../../database";
interface PaymentProps {
  product_id: string;
  user_id: string;
  pix_id: string;
};

export const Payment = {
  get: async(app: FastifyInstance) => app.get('/payment', async (request, reply) => {
    const payment = await knex('payment').select('*')
    .then(res => res.map(fuck => ({
      ...fuck,
      product: JSON.parse(fuck.product),
      user: JSON.parse(fuck.user)
    })));

    return { payment }
  }),
  post: async(app: FastifyInstance) => app.post('/payment', async (request, reply) => {
    const { product_id, user_id, pix_id } = request.query as PaymentProps;

    const product = await knex('products').first().where('id', '=', product_id)
    const user = await knex('users').first().where('id', '=', user_id)

    return knex('payment')
      .insert({
        id: crypto.randomUUID(),
        product: {
          title: product?.title
        },
        user: {
          name: user?.name
        },
        // pix: ''
      })
      .then(() =>
        reply.status(201).send({ message: 'Payment Executed Successfully' })
      )
      .catch((err) =>
        reply.status(400).send({
          error: err,
          message: 'Payment Failure'
        })
      )
  })
};
