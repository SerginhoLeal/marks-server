// import {  } from 'fastify';

interface CommentsProps {
  user_id: string;
  message: string;
};

interface SalesProps {
  date: string;
  quantity: number;
};

interface CreateProductsProps {
  id: string;
  title: string;
  price: number;
  material: string;
  create_at: string;
  session_id: string;
  description: string;
  color: Array<string>;
  image: Array<string>;
  gender: Array<string>;
  category: Array<string>;
  sales: Array<SalesProps>;
  comments: Array<CommentsProps>;
};

export {
  CreateProductsProps
};
