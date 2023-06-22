import { Knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    // products: {
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
    //   files: Array<string>;
    //   comments?: Array<CommentsProps>;
    //   sales?: Array<SalesProps>;
    //   create_at: string;
    // };
    products: {
      id: any;
      user_id: any;
      title: any;
      description: any;
      material: any;
      price: number;
      gender: any;
      color: any;
      category: any;
      card: any;
      file_banner: any;
      files: any;
      comments?: any;
      sales?: any;
      create_at: any;
    };
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      cpf: number;
    };
    payment: {
      id: string;
      user: object;
      status: string;
      product: object;
      code_pix: string;
      code_user: string;
      code_product: string;
    };
  }
}