import sequelize from './database';

export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

export const runMigrations = async (): Promise<void> => {
  try {
    // Run migrations using Sequelize CLI
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);
    
    console.log('🔄 Running database migrations...');
    await execAsync('npx sequelize-cli db:migrate');
    console.log('✅ Database migrations completed successfully.');
  } catch (error) {
    console.error('❌ Error running migrations:', error);
    throw error;
  }
};

export const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: false }); // Set force: true to drop and recreate tables
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Error synchronizing database:', error);
    throw error;
  }
}; 