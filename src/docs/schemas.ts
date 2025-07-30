/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: User unique identifier
 *         firstName:
 *           type: string
 *           description: User first name
 *         lastName:
 *           type: string
 *           description: User last name
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *         phoneNumber:
 *           type: string
 *           description: User phone number
 *         isAdmin:
 *           type: boolean
 *           description: Whether user is an admin
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: User last update timestamp
 *     
 *     SimpleUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: User unique identifier
 *         firstName:
 *           type: string
 *           description: User first name
 *         lastName:
 *           type: string
 *           description: User last name
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *     
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Task unique identifier
 *         title:
 *           type: string
 *           description: Task title
 *         description:
 *           type: string
 *           description: Task description
 *         status:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *           description: Task status
 *         assignedToId:
 *           type: number
 *           description: Assigned user ID
 *         ownerId:
 *           type: number
 *           description: Task owner ID
 *         totalTime:
 *           type: string
 *           description: Total time spent on task
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Task creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Task last update timestamp
 *         owner:
 *           $ref: '#/components/schemas/SimpleUser'
 *         assignedTo:
 *           $ref: '#/components/schemas/SimpleUser'
 *     
 *     LoginRequest:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *     
 *     RegisterRequest:
 *       type: object
 *       required: [firstName, lastName, email, password, phoneNumber]
 *       properties:
 *         firstName:
 *           type: string
 *           description: User first name
 *         lastName:
 *           type: string
 *           description: User last name
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *         phoneNumber:
 *           type: string
 *           description: User phone number
 *     
 *     AuthResponse:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/User'
 *         token:
 *           type: string
 *           description: JWT authentication token
 *     
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Success status, always false for errors
 *         error:
 *           type: string
 *           description: Error type (e.g., "Authentication Error", "Task Error", "Duplicate Entry", "Internal Server Error")
 *         message:
 *           type: string
 *           description: Error message description
 *       required: [success, error, message]
 */
export const schemas = {};