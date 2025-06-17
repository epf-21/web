import { z } from 'zod'
import { ValidationError } from '../../../utils/errors.js'

const createSolutionSchema = z.object({
  respuestas: z.array(
    z.string().min(1, 'La respuesta no puede estar vacia')
  ).min(1, 'Debe proporcionar al menos una respuesta')
})

export function validateCreateSolution (data) {
  const result = createSolutionSchema.safeParse(data)

  if (!result.success) {
    throw new ValidationError(result.error.errors[0].message)
  }

  return result.data
}
