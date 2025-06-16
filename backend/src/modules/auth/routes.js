import { Router } from 'express'
import { AuthController } from './controllers/auth.controller.js'

const authRouter = Router()

authRouter.post('/register', AuthController.register)
authRouter.post('/verify-email', AuthController.verifyEmail)
authRouter.post('/resend-code', AuthController.resendVerificationCode)
authRouter.post('/login', AuthController.login)

export default authRouter
