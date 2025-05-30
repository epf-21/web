import { z } from 'zod'
import { AppError } from '../utils/errors.js'

const QuestionYearSchema = z.object({
  years: z
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, 'Formato de edad inválido'),
  idUsuario: z.string().uuid()
})

export function validateQuestionYear (data) {
  const result = QuestionYearSchema.safeParse(data)
  if (!result.success) {
    throw new AppError(result.error.errors[0].message, 400)
  }
  return result.data
}
