import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthModel } from '../models/auth.model.js'
import { JWT_SECRET } from '../../../config/env.js'
import { AppError } from '../../../utils/errors.js'
import { validateLogin, validateRegister, validateVerifyEmail, validateResendCode } from '../schema/auth.schema.js'
import { sendVerificationMail, generateVerificationCode } from '../../../config/mail.js'

export class AuthService {
  static verificationCodes = new Map()

  static async register (data) {
    const { name, email, password } = validateRegister(data)
    const exist = await AuthModel.findUserByEmail(email)
    if (exist) {
      throw new AppError('El correo ya está registrado')
    }

    const verificationCode = generateVerificationCode()

    await sendVerificationMail(email, verificationCode)
    this.verificationCodes.set(email, {
      code: verificationCode,
      userData: { name, email, password },
      expiresAt: Date.now() + 10 * 60 * 1000
    })
    return {
      message: 'Codigo de verificacion enviado',
      email,
      requiresVerification: true
    }
  }

  static async verifyEmail (data) {
    const { email, code } = validateVerifyEmail(data)

    const storedData = this.verificationCodes.get(email)

    if (!storedData) {
      throw new AppError('Codigo de verificación no encontrado o expirado')
    }

    if (storedData.expiresAt < Date.now()) {
      this.verificationCodes.delete(email)
      throw new AppError('Codigo de verificacion expirado')
    }

    if (storedData.code !== code) {
      throw new AppError('Codigo de verificacion incorrecto')
    }

    const { name, email: userEmail, password } = storedData.userData
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await AuthModel.create({
      nombre: name,
      email: userEmail,
      contrasenia: hashedPassword,
      rol: 'PROFESOR'
    })

    this.verificationCodes.delete(email)

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    return {
      token
    }
  }

  static async resendVerificationCode (data) {
    const { email } = validateResendCode(data)
    const storedData = this.verificationCodes.get(email)

    if (!storedData) {
      throw new AppError('No se encontró una solicitud de registro para este correo')
    }

    const newVerificationCode = generateVerificationCode()

    await sendVerificationMail(email, newVerificationCode)

    storedData.code = newVerificationCode
    storedData.expiresAt = Date.now() + 10 * 60 * 1000
    this.verificationCodes.set(email, storedData)

    return {
      message: 'Nuevo código de verificación enviado'
    }
  }

  static async login (data) {
    const { email, password } = validateLogin(data)
    const user = await AuthModel.findUserByEmail(email)
    if (!user) {
      throw new AppError('Usuario no encontrado', 404)
    }

    const valid = await bcrypt.compare(password, user.contrasenia)
    if (!valid) {
      throw new AppError('Contraseña incorrecta')
    }
    const token = jwt.sign({ id: user.id, email: user.email, rol: user.rol }, JWT_SECRET, { expiresIn: '1d' })

    return {
      token
    }
  }
}
