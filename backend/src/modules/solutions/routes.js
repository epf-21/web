import { Router } from 'express'
import { SolutionController } from './controllers/solution.controller.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const solutionRouter = Router()

solutionRouter.post('/:id', authMiddleware, SolutionController.createSolutions)
solutionRouter.get('/:id', authMiddleware, SolutionController.getAllSolutions)
solutionRouter.delete('/:idRespuesta/question/:idPregunta', authMiddleware, SolutionController.deleteSolutionById)
solutionRouter.delete('/question/:idPregunta', authMiddleware, SolutionController.deleteAllSolutions)

export default solutionRouter
