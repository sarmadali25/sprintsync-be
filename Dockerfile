# Multi-stage build for production
FROM node:18-alpine AS builder

# Install yarn using apk (Alpine's package manager)
RUN apk add --no-cache yarn

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Build TypeScript code
RUN yarn build

# Production stage
FROM node:18-alpine AS production

# Install yarn using apk (Alpine's package manager)
RUN apk add --no-cache yarn

# Create app user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN yarn install --production && \
    yarn cache clean

# Copy built application from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

# Copy config files needed for migrations
COPY --from=builder --chown=nodejs:nodejs /app/config ./config
COPY --from=builder --chown=nodejs:nodejs /app/migrations ./migrations
COPY --from=builder --chown=nodejs:nodejs /app/seeders ./seeders
COPY --from=builder --chown=nodejs:nodejs /app/.sequelizerc ./.sequelizerc

# Create logs directory
RUN mkdir -p logs && chown -R nodejs:nodejs logs

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"] 