export class AppError extends Error {
  constructor (message, status = 400) {
    super(message)
    this.name = 'AppError'
    this.status = status
  }
}

export class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
    this.status = 400
  }
}
