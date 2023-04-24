import fastify from "fastify";

import { Routes } from "./routes";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyCookie);
app.register(Routes.products, { prefix: 'api' });
app.register(Routes.users, { prefix: 'api' });