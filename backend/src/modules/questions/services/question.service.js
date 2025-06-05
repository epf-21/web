import { QuestionModel } from '../models/question.model.js'
import { validateQuestionCreate, validateQuestionYear } from '../schemas/question.schema.js'
import { AppError } from '../../../utils/errors.js'

export class QuestionService {
  static async getQuestionDetail (id) {
    const question = await QuestionModel.getQuestionById(id)
    if (!question) {
      throw new AppError('Pregunta no encontrada', 404)
    }

    return {
      id: question.id,
      title: question.titulo,
      description: question.descripcion,
      explanation: question.explicacion,
      state: question.estado,
      level: question.nivel,
      responses: question.respuestas.map(response => ({
        id: response.id,
        responses: response.respuesta
      })),
      images: question.imagenes.map(image => ({
        id: image.id,
        name: image.nombre,
        url: image.url
      }))
    }
  }

  static async findQuestionsByYear (data) {
    const { level, idUsuario } = validateQuestionYear(data)

    const questions = await QuestionModel.getQuestionsByEdad({ nivel: level, idUsuario })
    return questions.map(question => ({
      id: question.id,
      title: question.titulo,
      description: question.descripcion
    }))
  }

  static async createQuestion (data) {
    const { idUsuario, titulo, descripcion, explicacion, estado, nivel, imagenes } = validateQuestionCreate(data)
    return await QuestionModel.createQuestion({
      idUsuario,
      titulo,
      descripcion,
      explicacion,
      estado,
      nivel,
      imagenes
    })
  }

  static async deleteQuestion (id) {
    return await QuestionModel.deleteQuestionById(id)
  }
}
