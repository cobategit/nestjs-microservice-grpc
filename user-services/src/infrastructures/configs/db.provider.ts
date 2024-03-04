import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const config = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + './../models/*.model{.ts,.js}'],
  synchronize: true,
  schema: process.env.DB_SCHEMA,
});

config
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

console.log(config);

export default config;
