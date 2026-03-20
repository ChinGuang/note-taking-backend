import { DataSource } from 'typeorm';
import { Note } from '../../entity/note.entity.js';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Note],
  migrations: ['src/migrations/*.ts'], // Path where migrations will be stored
  synchronize: false, // Always false in production!
});
