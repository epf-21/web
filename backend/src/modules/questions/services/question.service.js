import { QuestionModel } from '../models/question.model.js'
import { validateQuestionYear } from '../schemas/question.schema.js'
import { AppError } from '../../../utils/errors.js'

export class QuestionService {
  static async findQuestionsByYear (data) {
    const { years, idUsuario } = validateQuestionYear(data)
    const [edadMinima, edadMaxima] = years.split('-').map(Number)

    if (edadMinima >= edadMaxima) {
      throw new AppError('La edad mínima debe ser menor que la edad máxima', 400)
    }

    const questions = await QuestionModel.getQuestionsByEdad(edadMinima, edadMaxima, idUsuario)
    return questions.map(question => ({
      id: question.id,
      title: question.titulo,
      description: question.descripcion
    }))
  }

  static async createQuestion ({ titulo, descripcion, explicacion, imagenes, idUsuario }) {
    return await QuestionModel.createQuestion(
      titulo,
      descripcion,
      explicacion,
      imagenes,
      idUsuario
    )
  }

  static async deleteQuestion (id) {
    return await QuestionModel.deleteQuestionById(id)
  }
}
