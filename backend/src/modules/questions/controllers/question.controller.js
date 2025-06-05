import { QuestionService } from '../services/question.service.js'

export class QuestionController {
  static async getQuestionDetail (req, res, next) {
    try {
      const { id } = req.params
      const question = await QuestionService.getQuestionDetail(id)
      res.status(200).json({
        ok: true,
        data: question
      })
    } catch (error) {
      next(error)
    }
  }

  static async findQuestionByYear (req, res, next) {
    try {
      const { level } = req.query
      const idUsuario = req.user.id

      const questions = await QuestionService.findQuestionsByYear({ level, idUsuario })
      res.status(200).json({
        ok: true,
        data: questions
      })
    } catch (error) {
      next(error)
    }
  }

  static async createQuestion (req, res, next) {
    try {
      const body = req.body
      const idUsuario = req.user.id

      const preguntaCreada = await QuestionService.createQuestion({ idUsuario, ...body })

      res.status(201).json({
        ok: true,
        data: preguntaCreada
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteQuestion (req, res, next) {
    try {
      const { id } = req.params

      await QuestionService.deleteQuestion(id)

      res.status(200).json({
        ok: true,
        message: 'Pregunta eliminada correctamente'
      })
    } catch (error) {
      next(error)
    }
  }
}
