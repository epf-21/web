import { QuestionModel } from '../models/question.model.js'
import { validateQuestionCreate, validateQuestionLevel, validateQuestionUpdate } from '../schemas/question.schema.js'
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
      level: question.nivel,
      imageMain: question.imagenPrincipal,
      images: question.imagenes.map(image => ({
        id: image.id,
        name: image.nombre,
        url: image.url
      }))
    }
  }

  static async findQuestionsByLevel (data) {
    const { level, idUsuario } = validateQuestionLevel(data)

    const questions = await QuestionModel.getQuestionsByLevel({ nivel: level, idUsuario })
    return questions.map(question => ({
      id: question.id,
      title: question.titulo,
      description: question.descripcion
    }))
  }

  static async createQuestion (data) {
    const { idUsuario, titulo, descripcion, explicacion, nivel, imagenes } = validateQuestionCreate(data)
    return await QuestionModel.createQuestion({
      idUsuario,
      titulo,
      descripcion,
      explicacion,
      nivel,
      imagenes
    })
  }

  static async deleteQuestion (id) {
    return await QuestionModel.deleteQuestionById(id)
  }

  static async updateQuestion (id, data) {
    const { titulo, descripcion, explicacion, nivel, imagenes } = validateQuestionUpdate(data)

    const existing = await QuestionModel.getQuestionById(id)
    if (!existing) {
      throw new AppError('Pregunta no encontrada', 404)
    }

    const updated = await QuestionModel.updateQuestionById({
      id,
      titulo,
      descripcion,
      explicacion,
      nivel,
      imagenes
    })

    return {
      id: updated.id,
      title: updated.titulo,
      description: updated.descripcion,
      explanation: updated.explicacion,
      level: updated.nivel,
      images: updated.imagenes.map(image => ({
        id: image.id,
        name: image.nombre,
        url: image.url
      }))
    }
  }

  static async updateImageMain (id, data) {
    const { imagenPrincipal } = validateQuestionUpdate(data)
    const existing = await QuestionModel.getQuestionById(id)
    if (!existing) {
      throw new AppError('Pregunta no encontrada', 404)
    }

    const updated = await QuestionModel.updateImageMain({ id, imagenPrincipal })
    return {
      id: updated.id,
      title: updated.titulo,
      imageMain: updated.imagenPrincipal
    }
  }
}
