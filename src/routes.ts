import { FastifyInstance } from "fastify";

import { Products } from './modules/products';
import { User } from './modules/users';
import { Payment } from './modules/payment';

export const Routes = {
  users: async(app: FastifyInstance) => {
    await User.login(app),
    await User.create(app)
  },
  products: async(app: FastifyInstance) => {
    await Products.get(app),
    await Products.post(app),
    await Products.update(app),
    await Products.delete(app)
  },
  payment: async(app: FastifyInstance) => {
    await Payment.get(app)
    await Payment.post(app)
    await Payment.confirm(app)
  }
};
