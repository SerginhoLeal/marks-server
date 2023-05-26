import { FastifyInstance } from "fastify";
import crypto from 'node:crypto';

import { knex } from "../../database";

import { checkTokenAuthExist } from "../../middleware";
interface PaymentProps {
  product_id: string;
  user_id: string;
  pix_id: string;
  payment_id?: string;
};

export const Payment = {
  get: async(app: FastifyInstance) => app.get('/payment', { preHandler: [checkTokenAuthExist] }, async (request, reply) => {
    // as chances 
    const { filter } = request.query;

    const array_payment = await knex('payment').where({ code_user: request.user_id, status: filter }).orderBy('create_at', 'desc');

    const payment = array_payment.map((items: any) => ({
      id: items.id,
      status: items.status,
      code_product: items.code_product,
      product: JSON.parse(items.product),
      user: JSON.parse(items.user),
      create_at: items.create_at
    }))

    return payment
  }),
  // approved: async(app: FastifyInstance) => app.get('/payment-approved', { preHandler: [checkTokenAuthExist] }, async (request, reply) => {

  // }),
  // rejected: async(app: FastifyInstance) => app.get('/payment-rejected', { preHandler: [checkTokenAuthExist] }, async (request, reply) => {

  // }),
  post: async(app: FastifyInstance) => app.post('/payment', { preHandler: [checkTokenAuthExist] }, async (request, reply) => {
    const { product_id, pix_id } = request.query as PaymentProps;

    const product = await knex('products').where({ id: product_id }).first();
    const user = await knex('users').where({ id: request.user_id }).first();

    const data = {
      id: crypto.randomUUID(),
      code_user: request.user_id,
      code_pix: 'qrcode+pix',
      status: 'progress',
      product: {
        id: product_id,
        title: product?.title
      },
      user: {
        name: user?.name
      }
    };

    return knex('payment')
      .insert(data)
      .then(() => reply.status(201).send({ message: 'Payment Executed Successfully' }))
      .catch(err => reply.status(400).send({ error: err, message: 'Payment Failure' }))
  }),
  confirm: async(app: FastifyInstance) => app.post('/confirm', { preHandler: [checkTokenAuthExist] }, async (request, reply) => {
    const { payment_id } = request.query as PaymentProps;

    const find_payment = await knex('payment').where({ id: payment_id }).first();

    return knex('payment')
      .where({ id: payment_id })
      .update({ ...find_payment, status: 'approved', })
      .then(() => reply.status(201).send({ message: 'Successfully, Order in Progress' }))
      .catch(err => reply.status(400).send({ error: err, message: 'Rejected Request' }))
  })
};
