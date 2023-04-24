import { FastifyReply, FastifyRequest } from "fastify";
import jwt from'jsonwebtoken';

const JWT = process.env.JWT;

export function checkTokenAuthExist(req:FastifyRequest, reply: FastifyReply, next){
  const { token: authorization } = req.cookies;

  const BearerAuthorization = `Bearer ${authorization}`

  if(!BearerAuthorization)
    return reply.status(401).send({error: 'Token Not Provided'});

  const parts = BearerAuthorization.split(' ');
  console.log(parts.length);
  
  if(parts.length === 2)
    return reply.status(401).send({error: 'Token error'});

  const [ scheme, token ] = parts;

  if(!/^Bearer$/i.test(scheme))
    return reply.status(401).send({error: 'Token malformation'});

  jwt.verify(token, JWT, (err, decoded) => {
    if (err) return reply.status(401).send({error: 'Token invalided'});
    req.user_id = decoded.id;
    return next();
  })
}

export const generateToken = (params = {}) => {
  return jwt.sign(params, JWT, { expiresIn: 1000 * 60 * 60 * 24 * 1 });
};
