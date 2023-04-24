import { FastifyInstance } from "fastify";

export const Panel = {
  get: () => {},
  post: async(app: FastifyInstance) => app.get('/panel', async (request, reply) => {
    
  })
};
