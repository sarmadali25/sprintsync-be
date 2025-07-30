import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Railway provides DATABASE_URL, but we'll also support individual variables
const getDatabaseConfig = () => {
  console.log('=== DATABASE DEBUG ===');
  console.log('DATABASE_URL:', process.env['DATABASE_URL']);
  console.log('PGHOST:', process.env['PGHOST']);
  console.log('PGUSER:', process.env['PGUSER']);
  console.log('PGDATABASE:', process.env['PGDATABASE']);
  console.log('=====================');

  // For Railway, prefer individual variables over DATABASE_URL to avoid private domain issues
  if (process.env['PGHOST'] && process.env['PGUSER'] && process.env['PGDATABASE']) {
    return {
      dialect: 'postgres' as const,
      host: process.env['PGHOST'],
      port: parseInt(process.env['PGPORT'] || '5432'),
      username: process.env['PGUSER'],
      password: process.env['PGPASSWORD'],
      database: process.env['PGDATABASE'],
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
  }

  // If DATABASE_URL is provided but individual vars aren't (parse it manually for Railway)
  if (process.env['DATABASE_URL']) {
    const url = new URL(process.env['DATABASE_URL']);
    
    // Handle Railway's private domain by using a workaround
    let hostname = url.hostname;
    if (hostname === 'railway-private-domain') {
      // Try to get the actual hostname from Railway's environment
      hostname = process.env['PGHOST'] || hostname;
    }

    return {
      dialect: 'postgres' as const,
      host: hostname,
      port: parseInt(url.port || '5432'),
      username: url.username,
      password: url.password,
      database: url.pathname.replace('/', ''),
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