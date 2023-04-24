import { config } from 'dotenv';

if (process.env.NODE_ENV === 'test'){
  config({ path: '.env.test' })
} else {
  config()
}

interface EnvProps {
  NODE_ENV: string;
  DATABASE_URL: string;
  PORT: number;
}

const _env: EnvProps = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || './db/app.db',
  PORT: Number(process.env.PORT) || 3333
};

if(!_env.NODE_ENV || !_env.DATABASE_URL || !_env.PORT){
  // console.error('⚠ Invalid Environment Variable ', _env.error.format())

  throw new Error('Invalid Environment Variable');
};

export const env = _env;
