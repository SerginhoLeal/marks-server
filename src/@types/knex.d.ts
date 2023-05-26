import { Knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    products: {
      id: string;
      user_id: string;
      title: string;
      price: number;
      material: string;
      create_at: string;
      description: string;
      search_code: string;
      session_id: string;
      color: string;
      image: string;
      gender: string;
      category: string;
      sales?: Array<SalesProps>;
      comments?: Array<CommentsProps>;
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