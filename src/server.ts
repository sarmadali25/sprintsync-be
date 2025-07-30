import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import router from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { errorLogger, structuredLogger } from './middleware/logging';
import { testConnection, runMigrations } from './config/dbConnection';
import { specs } from './config/swagger';

dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3000;


// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(structuredLogger);
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Swagger documentation
const swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'SprintSync API Documentation'
};
app.use('/api-docs', (swaggerUi as any).serve, (swaggerUi as any).setup(specs, swaggerOptions));

app.use(router);

app.use(errorLogger);
app.use(errorHandler);

app.use("*", notFoundHandler);

// Start server
const server = app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env['NODE_ENV'] || 'development'}`);
  console.log(` Health check: http://localhost:${PORT}/api/v1/health`);
  
  try {
    await testConnection();
    if (process.env['NODE_ENV'] === 'production') {
      await runMigrations();
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export { app, server }; 