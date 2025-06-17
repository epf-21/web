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

  static async deleteSolutionById (data) {
    const { idRespuesta, idPregunta } = data

    const solution = await SolutionModel.findSolutionsById(idRespuesta)

    if (!solution) {
      throw new AppError('Respuesta no encontrada', 404)
    }

    if (solution.idPregunta !== idPregunta) {
      throw new AppError('La respuesta no pertenece a la pregunta', 400)
    }

    return await SolutionModel.deleteSolutionById(idRespuesta)
  }

  static async deleteAllSolutions (data) {
    const { idPregunta } = data

    const question = await QuestionModel.getQuestionById(idPregunta)

    if (!question) {
      throw new AppError('Pregunta no encontrada', 404)
    }

    return await SolutionModel.deleteAllSolutions(idPregunta)
  }
}
