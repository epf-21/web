import { AppError } from '../../../utils/errors'
import { QuestionModel } from '../../questions/models/question.model'
import { SolutionModel } from '../models/solution.model'
import { validateCreateSolution } from '../schemas/solution.schema'

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
