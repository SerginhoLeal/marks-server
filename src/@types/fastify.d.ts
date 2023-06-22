import { FastifyRequest } from "fastify";

declare module 'fastify' {
  interface FastifyRequest {
    // body: {
    //   id: string;
    //   user_id: string;
    //   title: string;
    //   description: string;
    //   material: Array<string>;
    //   price: number;
    //   gender: Array<string>;
    //   color: Array<string>;
    //   category: Array<string>;
    //   card: Array<string>;
    //   file_banner: string;
    //   files: Array<FileProps>;
    //   comments?: Array<CommentsProps>;
    //   sales?: Array<SalesProps>;
    //   create_at: string;
    // },
    files: {
      files: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: "image" | "video" | "raw" | "auto" | undefined;
        key: string;
        destination: string;
        filename: string;
        path: string;
        size: number;
      }[],
      file_banner: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        key: string;
        destination: string;
        filename: string;
        path: string;
        size: number;
      }[];
    };
    user_id: string;
  }
}