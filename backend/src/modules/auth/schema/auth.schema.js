import { z } from 'zod'
import { AppError } from '../../../utils/errors.js'

const RegisterSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Correo invalido'),
  password: z.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'
  ),
  rol: z.enum(['PROFESOR', 'ADMINISTRADOR'], {
    errorMap: () => ({ message: 'Rol invalido' })
  }),
  phone: z.string().optional()
})

const LoginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria')
})

export function validateRegister (data) {
  const result = RegisterSchema.safeParse(data)

  if (!result.success) {
    throw new AppError(result.error.errors[0].message)
  }
  return result.data
}

export function validateLogin (data) {
  const result = LoginSchema.safeParse(data)

  if (!result.success) {
    throw new AppError(result.error.errors[0].message)
  }
  return result.data
}
