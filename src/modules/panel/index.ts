import { FastifyInstance } from "fastify";

export const Panel = {
  get: () => {},
  post: async(app: FastifyInstance) => app.post('/panel', async (request, reply) => {
    
  })
};
