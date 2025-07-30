# Docker Setup for SprintSync Backend

This project includes Docker configuration for both development and production environments.

## Files Created

- `Dockerfile` - Production Dockerfile for Node.js application
- `Dockerfile.dev` - Development Dockerfile with hot reloading
- `docker-compose.yml` - Production Docker Compose configuration
- `docker-compose.dev.yml` - Development Docker Compose configuration
- `.dockerignore` - Excludes unnecessary files from Docker build

## Quick Start

### Development Environment

1. **Start the development environment:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Run database migrations:**
   ```bash
   docker-compose -f docker-compose.dev.yml exec app yarn migrate
   ```

3. **Seed the database:**
   ```bash
   docker-compose -f docker-compose.dev.yml exec app yarn seed
   ```

### Production Environment

1. **Start the production environment:**
   ```bash
   docker-compose up --build
   ```

2. **Run production migrations:**
   ```bash
   docker-compose exec app yarn migrate:production
   ```

## Useful Commands

### Development
```bash
# Start services
docker-compose -f docker-compose.dev.yml up

# Start in background
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down

# Rebuild and start
docker-compose -f docker-compose.dev.yml up --build
```

### Production
```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

## Environment Variables

The Docker setup uses these default environment variables:

- `DB_HOST=postgres`
- `DB_PORT=5432`
- `DB_NAME=sprintsync`
- `DB_USER=postgres`
- `DB_PASSWORD=postgres`

You can override these by creating a `.env` file or modifying the docker-compose files.

## Database Access

- **Host:** localhost
- **Port:** 5432
- **Database:** sprintsync
- **Username:** postgres
- **Password:** postgres

## Application Access

- **URL:** http://localhost:3000
- **API Documentation:** http://localhost:3000/api-docs (if Swagger is configured)

## Troubleshooting

1. **Port conflicts:** If ports 3000 or 5432 are already in use, modify the port mappings in docker-compose files.

2. **Database connection issues:** Ensure the PostgreSQL container is healthy before starting the app.

3. **Permission issues:** On Linux/Mac, you might need to run Docker commands with `sudo`.

4. **Clean slate:** To start completely fresh:
   ```bash
   docker-compose down -v
   docker system prune -a
   ``` 