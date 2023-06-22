import fastify from "fastify";

import { Routes } from "./routes";
import fastifyCookie from "@fastify/cookie";

import multer from "fastify-multer";

export const app = fastify();

app.register(multer.contentParser)
app.register(fastifyCookie);

app.register(Routes.products, { prefix: 'api' });
app.register(Routes.users, { prefix: 'api' });
app.register(Routes.payment, { prefix: 'api' });