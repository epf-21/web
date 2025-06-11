import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthModel } from '../models/auth.model.js'
import { JWT_SECRET } from '../../../config/env.js'
import { AppError } from '../../../utils/errors.js'
import { validateLogin, validateRegister } from '../schema/auth.schema.js'

export class AuthService {
  static async register (data) {
    const { name, email, password } = validateRegister(data)
    const exist = await AuthModel.findUserByEmail(email)
    if (exist) {
      throw new AppError('El correo ya está registrado')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await AuthModel.create({
      nombre: name,
      email,
      contrasenia: hashedPassword,
      rol: 'PROFESOR'
    })
    const token = jwt.sign({ id: user.id, email: user.email, rol: user.rol }, JWT_SECRET, { expiresIn: '1d' })
    return {
      token
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
