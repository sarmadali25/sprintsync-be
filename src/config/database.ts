import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Railway provides DATABASE_URL, but we'll also support individual variables
const getDatabaseConfig = () => {
  console.log('=== DATABASE DEBUG ===');
  console.log('DATABASE_URL:', process.env['DATABASE_URL']);
  console.log('Parsed URL:', process.env['DATABASE_URL'] ? new URL(process.env['DATABASE_URL']) : 'N/A');
  console.log('=====================');

  // If DATABASE_URL is provided (Railway's preferred method)
  if (process.env['DATABASE_URL']) {
    return {
      url: process.env['DATABASE_URL'],
      dialect: 'postgres' as const,
      logging: process.env['NODE_ENV'] === 'development' ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      dialectOptions: {
        ssl: process.env['NODE_ENV'] === 'production' ? {
          require: true,
          rejectUnauthorized: false
        } : false,
        // Force IPv4 for Railway compatibility
        family: 4
      },
      // Add retry logic for Railway
      retry: {
        max: 3
      }
    };
  }

  // Fallback to individual environment variables
  return {
    dialect: 'postgres' as const,
    host: process.env['PGHOST'] || process.env['DB_HOST']!,
    port: parseInt(process.env['PGPORT'] || process.env['DB_PORT']!),
    username: process.env['PGUSER'] || process.env['DB_USER']!,
    password: process.env['PGPASSWORD'] || process.env['DB_PASSWORD']!,
    database: process.env['PGDATABASE'] || process.env['DB_NAME']!,
    logging: process.env['NODE_ENV'] === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: process.env['NODE_ENV'] === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  };
};

const sequelize = new Sequelize(getDatabaseConfig());

export default sequelize; 