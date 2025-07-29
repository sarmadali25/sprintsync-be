# SprintSync Backend

A robust Node.js/Express.js backend API for task management and assignment with user authentication and admin controls.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin/User)
  - Secure password hashing with bcrypt

- **Task Management**
  - CRUD operations for tasks
  - Task status updates
  - AI-powered description suggestions
  - Admin-only task creation and management

- **Database Management**
  - PostgreSQL with Sequelize ORM
  - Automated migrations and seeders
  - Database connection pooling

- **Security & Performance**
  - Helmet.js for security headers
  - CORS configuration
  - Request logging with Morgan
  - Input validation with Joi
  - Error handling middleware

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Yarn or npm

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SprintSync-BE
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=sprintsync_db
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   
   # AI Service (optional)
   CEREBRAS_API_KEY=your_cerebras_api_key
   ```

4. **Database Setup**
   ```bash
   # Create database
   npm run db:create
   
   # Run migrations
   npm run migrate
   
   # Seed demo users
   npm run seed
   ```

## 🚀 Running the Application

### Development Mode
```bash
# Start development server with hot reload
npm run watch

# Or start without hot reload
npm run dev
```

### Production Mode
```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📊 Database Management

### Migrations
```bash
# Run migrations
npm run migrate

# Undo last migration
npm run migrate:undo

# Undo all migrations
npm run migrate:undo:all

# Check migration status
npm run migrate:status
```

### Seeders
```bash
# Run all seeders
npm run seed

# Undo all seeders
npm run seed:undo

# Production seeding
npm run seed:production
```

## 🔐 Demo Users

The seeder creates two demo users:

### Admin User
- **Email:** `admin@admin.com`
- **Password:** `Admin@123`
- **Role:** Admin (full access)

### Regular User
- **Email:** `user@user.com`
- **Password:** `User@123`
- **Role:** User (limited access)

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@user.com",
  "password": "User@123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@user.com",
    "firstName": "Regular",
    "lastName": "User",
    "phoneNumber": "+0987654321"
  },
  "token": "jwt_token_here"
}
```

#### POST `/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890"
}
```

#### GET `/auth/me`
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### GET `/auth/all`
Get all users (admin only).

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

### Task Endpoints

#### GET `/task`
Get all tasks (authenticated users).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### GET `/task/:id`
Get task by ID (authenticated users).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### POST `/task`
Create a new task (admin only).

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "title": "Complete API Documentation",
  "description": "Write comprehensive API documentation",
  "assignedTo": "user_uuid",
  "priority": "high",
  "dueDate": "2024-01-15"
}
```

#### PUT `/task/:id`
Update a task (admin only).

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

#### PATCH `/task/:id`
Update task status (authenticated users).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "status": "in_progress"
}
```

#### DELETE `/task/:id`
Delete a task (admin only).

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

#### POST `/task/description-suggesstion`
Get AI-powered task description suggestions (admin only).

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "title": "Implement user authentication"
}
```

### Health Check

#### GET `/health`
Check API health status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🏗️ Project Structure

```
SprintSync-BE/
├── config/
│   ├── database.js          # Sequelize configuration
│   └── database.ts          # TypeScript database config
├── logs/                    # Application logs
├── migrations/              # Database migrations
├── models/                  # Sequelize models
├── seeders/                 # Database seeders
├── src/
│   ├── config/
│   │   ├── database.ts      # Database connection
│   │   └── dbConnection.ts  # Connection utilities
│   ├── controllers/         # Route controllers
│   ├── handlers/            # Business logic handlers
│   ├── middleware/          # Express middleware
│   ├── models/              # TypeScript models
│   ├── routes/              # API routes
│   ├── services/            # Business services
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   └── server.ts            # Main server file
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_USER` | Database username | - |
| `DB_PASSWORD` | Database password | - |
| `DB_NAME` | Database name | - |
| `JWT_SECRET` | JWT secret key | `your-secret-key` |
| `CEREBRAS_API_KEY` | AI service API key | - |


## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run dev` | Start development server |
| `npm run watch` | Start with nodemon for hot reload |
| `npm run migrate` | Run database migrations |
| `npm run seed` | Run database seeders |
| `npm run db:create` | Create database |
| `npm run db:drop` | Drop database |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

- **v1.0.0** - Initial release with authentication and task management 