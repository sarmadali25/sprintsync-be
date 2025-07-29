import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env['DB_HOST']!,
  port: parseInt(process.env['DB_PORT']!),
  username: process.env['DB_USER']!,
  password: process.env['DB_PASSWORD']!,
  database: process.env['DB_NAME']!,
  logging: process.env['NODE_ENV'] === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default sequelize; 