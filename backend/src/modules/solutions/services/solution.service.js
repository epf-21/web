import { AppError } from '../../../utils/errors.js'
import { QuestionModel } from '../../questions/models/question.model.js'
import { SolutionModel } from '../models/solution.model.js'
import { validateCreateSolution } from '../schemas/solution.schema.js'

export class SolutionService {
  static async createSolutions (idPregunta, data) {
    const existing = await QuestionModel.getQuestionById(idPregunta)
    if (!existing) {
      throw new AppError('Pregunta no encontrada', 404)
    }

    const { respuestas } = validateCreateSolution(data)
    return await SolutionModel.createSolutions(idPregunta, respuestas)
  }
}
