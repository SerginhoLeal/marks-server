import { FastifyInstance } from "fastify";

import { Products } from './modules/products';
import { User } from './modules/users';

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
  }
};
