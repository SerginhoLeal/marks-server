import { FastifyReply, FastifyRequest } from "fastify";
import jwt from'jsonwebtoken';

const JWT: any = process.env.JWT;

export function checkTokenAuthExist(req: FastifyRequest, reply: FastifyReply, next: any){
  const { token: authorization } = req.cookies;

  const BearerAuthorization = `Bearer ${authorization}`

  if(!BearerAuthorization)
    return reply.status(401).send({ code: 1000 });

  const parts = BearerAuthorization.split(' ');
  
  if(parts.length !== 2)
    return reply.status(401).send({ code: 1001 });

  const [ scheme, token ] = parts;

  if(!/^Bearer$/i.test(scheme))
    return reply.status(401).send({ code: 1002 });

  jwt.verify(token, JWT, (err: any, decoded: any) => {
    if (err) return reply.status(401).send({ code: 1003 });
    req.user_id = decoded.id;
    return next();
  })
}

export const generateToken = (params = {}) =>
  jwt.sign(params, JWT, { expiresIn: 60 * 60 * 24 * 1 });
