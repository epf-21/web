import { QuestionService } from './question.service.js'

export class QuestionController {
  static async findQuestionByYear(req, res, next) {
    try {
      const { years } = req.params
      const idUsuario = 'b470c7fb-588b-4aad-b7d4-30ab22d60e1e'

      const questions = await QuestionService.findQuestionsByYear({ years, idUsuario })
      res.status(200).json({
        ok: true,
        data: questions
      })
    } catch (error) {
      next(error)
    }
  }
}
