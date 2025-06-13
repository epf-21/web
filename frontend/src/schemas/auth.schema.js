import { z } from 'zod';

const registerSchema = z.object({
  name: z.string()
    .min(3, 'Debe tener al menos 3 caracteres')
    .nonempty('El nombre es obligatorio'),
  email: z.string()
    .email('Formato de correo inválido')
    .nonempty('El correo es obligatorio'),
  password: z.string()
    .min(8, 'Debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe tener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe tener al menos una minuscula')
    .regex(/\d/, 'Debe tener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe tener al menos un carácter especial'),
})

const loginSchema = z.object({
  email: z.string()
    .email('Formato de correo inválido'),
  password: z.string()
    .min(1, 'La contraseña es obligatoria'),
})

export const validateRegister = (data) => registerSchema.safeParse(data);

export const validateLogin = (data) => loginSchema.safeParse(data);