import { SolutionService } from '../services/solution.service'

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
}
