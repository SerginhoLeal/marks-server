import { FastifyInstance } from "fastify";

export const Payment = {
  get: () => {},
  post: async(app: FastifyInstance) => app.get('/purchase', async (request, reply) => {
    const { id } = request.query as { id: string };
    
  })
};
