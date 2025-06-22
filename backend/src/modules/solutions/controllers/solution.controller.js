import { SolutionService } from '../services/solution.service.js'

export class SolutionController {
  static async createSolutions (req, res, next) {
    try {
      const { id } = req.params
      const data = req.body

      const created = await SolutionService.createSolutions(id, data)

      res.status(201).json({
        ok: true,
        data: created
      })
    } catch (error) {
      next(error)
    }
  }

  static async getAllSolutions (req, res, next) {
    try {
      const { id } = req.params
      const solutions = await SolutionService.getAllSolutions(id)
      res.status(200).json({
        ok: true,
        data: solutions
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteSolutionById (req, res, next) {
    try {
      const data = req.params
      await SolutionService.deleteSolutionById(data)

      res.status(200).json({
        ok: true,
        message: 'Respues eliminada correctamente'
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteAllSolutions (req, res, next) {
    try {
      const data = req.params

      await SolutionService.deleteAllSolutions(data)

      res.status(200).json({
        ok: true,
        message: 'Todas las respuestas fueron eliminadas'
      })
    } catch (error) {
      next(error)
    }
  }
}
