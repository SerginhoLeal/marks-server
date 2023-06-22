import { FastifyInstance, FastifyRequest } from "fastify";
import cloudinary from 'cloudinary';
import crypto from "node:crypto";

import { knex } from "../../database";

import { checkSessionIdExists, checkTokenAuthExist } from "../../middleware";
import { CreateProductsProps, CloudProps } from "./interface";

import storageTypes from '../../config/multer';
import { change } from "../../utils";

export const Products = {
  get: async(app: FastifyInstance) => app.get('/products', { preHandler: [checkTokenAuthExist] }, async (request, reply) => {
    const products = await knex('products')
      .select('*')
      .then(res => res.map(data => ({
          ...data,
          material: JSON.parse(data.material),
          card: JSON.parse(data.card),
          gender: JSON.parse(data.gender),
          color: JSON.parse(data.color),
          category: JSON.parse(data.category),
          files: JSON.parse(data.files),
        })
      ))

    return products;
  }),

  post: async(app: FastifyInstance) => {
    const storage = storageTypes.fields([{ name: 'files', maxCount: 5 }, { name: 'file_banner', maxCount: 1 }]);

    app.post('/product', {preHandler: [ checkTokenAuthExist, storage ]}, async(request, reply) => {
      const { title, price, material, description, color, gender, category, card } = request.body as CreateProductsProps;
      const { files, file_banner } = request.files;
      const title_replace = title.replace(' ', '_').toLocaleLowerCase();

      let cloudArray: Array<CloudProps> = [];

      for (const key in files) {
        if (Object.prototype.hasOwnProperty.call(files, key)) {
          const element = files[key];
          const upload = await cloudinary.v2.uploader.upload(element.path, {
            cloud_name: process.env.CLOUDNAME,
            api_key: process.env.APIKEY,
            api_secret: process.env.GLzoiVYLmZr2FX2Yruum5FuMyfk,
            resource_type: element.mimetype,
            // public_id: `pegi_eighteen/${title_replace}/${element.key}`,
            folder: `pegi_eighteen/${title_replace}`,
            overwrite: true,
          });

          cloudArray.push(upload);
        };
      };

      const filter_files = cloudArray.map(file => ({
        type: file.resource_type,
        file: file.url,
        preview: change(file.resource_type, file.url),
        width: file.width,
        height: file.height,
      }));

      return knex('products').insert({
        id: crypto.randomUUID(),
        user_id: request.user_id,
        title, description, material, price, gender, color, category, card,
        file_banner: filter_files[0].file,
        files: JSON.stringify(filter_files),
        comments: [],
        sales: []
      })
        .then(() => reply.status(201).send({ message: 'Register Successful' }))
        .catch((err) => reply.status(400).send({ error: err }))
    })
  },

  update: async(app: FastifyInstance) =>
    app.put('/products', { preHandler: [checkSessionIdExists, checkTokenAuthExist] }, async(request, reply) => {
      const { id } = request.query as { id: string };
      const update = request.body as CreateProductsProps;

      return knex('products')
        .where({ id })
        .update({ ...update })
        .then(() => reply.status(201).send())
        .catch((err) => reply.status(400).send({ error: err }))
  }),

  delete: async(app: FastifyInstance) =>
    app.delete('/product', { preHandler: [checkTokenAuthExist] }, async(request, reply) => {
      const { id } = request.query as { id: string };
      return knex('products')
        // .where({ id })
        .del()
        .then(() => reply.status(201).send())
        .catch((err) => reply.status(400).send({ error: err }))
  }),
};
