import { z } from 'zod'
import { ValidationError } from '../../../utils/errors.js'

const QuestionLevelSchema = z.object({
  level: z
    .enum(['FACIL', 'MEDIO', 'DIFICIL'], {
      required_error: 'El nivel es obligatorio',
      invalid_type_error: 'Nivel invalido'
    }
    ),
  idUsuario: z.string().uuid()
})

const CreateQuestionSchema = z.object({
  idUsuario: z.string().uuid(),
  titulo: z.string().min(1, 'El título es obligatorio'),
  descripcion: z.string().min(1, 'La descripcion es obligatoria'),
  explicacion: z.string().min(1, 'La explicacion es obligatoria'),
  estado: z.string().min(1, 'El estado es obligatorio'),
  nivel: z.enum(['FACIL', 'MEDIO', 'DIFICIL'], {
    required_error: 'El nivel es obligatorio',
    invalid_type_error: 'Nivel invalido'
  }),
  imagenes: z.array(
    z.object({
      nombre: z.string().min(1, 'El nombre de la imagen es obligatorio'),
      url: z.string().url('La URL de la imagen es inválida')
    })
  ).min(1, 'Debe haber al menos una imagen')
})

export function validateQuestionYear (data) {
  const result = QuestionLevelSchema.safeParse(data)

  if (!result.success) {
    throw new ValidationError(result.error.errors[0].message)
  }
  return result.data
}

export function validateQuestionCreate (data) {
  const result = CreateQuestionSchema.safeParse(data)

  if (!result.success) {
    throw new ValidationError(result.error.errors[0].message)
  }
  return result.data
}
