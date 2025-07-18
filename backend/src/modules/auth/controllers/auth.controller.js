import { AuthService } from '../services/auth.service.js'

export class AuthController {
  static async register (req, res, next) {
    try {
      const data = req.body
      const result = await AuthService.register(data)
      res.status(200).json({
        ok: true,
        ...result
      })
    } catch (error) {
      next(error)
    }
  }

  static async verifyEmail (req, res, next) {
    try {
      const data = req.body
      const result = await AuthService.verifyEmail(data)
      res.status(201).json({
        ok: true,
        ...result
      })
    } catch (error) {
      next(error)
    }
  }

  static async resendVerificationCode (req, res, next) {
    try {
      const data = req.body
      const result = await AuthService.resendVerificationCode(data)
      res.status(200).json({
        ok: true,
        ...result
      })
    } catch (error) {
      next(error)
    }
  }

  static async login (req, res, next) {
    try {
      const data = req.body
      const result = await AuthService.login(data)
      res.status(200).json({
        ok: true,
        ...result
      })
    } catch (error) {
      next(error)
    }
  }
}
