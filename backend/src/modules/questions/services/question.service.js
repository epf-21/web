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
      minAge: question.edadMinima,
      maxAge: question.edadMaxima,
      responses: question.respuestas.map(response => ({
        id: response.id,
        text: response.respuesta
      })),
      images: question.imagenes.map(image => ({
        id: image.idImagen,
        name: image.imagen.nombre,
        url: image.imagen.url
      }))
    }
  }

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

  static async createQuestion (data) {
    const { idUsuario, titulo, descripcion, explicacion, estado, edadMinima, edadMaxima, imagenes } = validateQuestionCreate(data)
    return await QuestionModel.createQuestion({
      idUsuario,
      titulo,
      descripcion,
      explicacion,
      estado,
      edadMinima,
      edadMaxima,
      imagenes
    })
  }

  static async deleteQuestion (id) {
    return await QuestionModel.deleteQuestionById(id)
  }
}
