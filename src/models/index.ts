import User from './User';
import Task from './Task';

// Export all models
export { User, Task };

// Export sequelize instance
export { default as sequelize } from '../config/database'; 