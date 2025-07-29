export class AuthError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
  }
}

export class TaskError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'TaskError';
    this.statusCode = statusCode;
  }
}
