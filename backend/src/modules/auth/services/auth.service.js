import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthModel } from '../models/auth.model.js'
import { JWT_SECRET } from '../../../config/env.js'

export class AuthService {
  static async register (data) {
    const { name, email, password, rol, phone } = data
    const exist = await AuthModel.findUserByEmail(email)
    if (exist) {
      throw new Error('El correo ya está registrado')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await AuthModel.create({
      nombre: name,
      email,
      contrasenia: hashedPassword,
      rol,
      telefono: phone
    })
    return { id: user.id, email: user.email }
  }

  static async login (data) {
    const { email, password } = data
    const user = await AuthModel.findUserByEmail(email)
    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const valid = await bcrypt.compare(password, user.contrasenia)
    if (!valid) {
      throw new Error('Contraseña incorrecta')
    }
    const token = jwt.sign({ id: user.id, email: user.email, rol: user.rol }, JWT_SECRET, { expiresIn: '1d' })

    return {
      user: {
        id: user.id,
        name: user.nombre,
        rol: user.rol,
        email: user.email
      },
      token
    }
  }
}
