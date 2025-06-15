import { Router } from 'express'
import { SolutionController } from './controllers/solution.controller.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const solutionRouter = Router()

solutionRouter.post('/:id', authMiddleware, SolutionController.createSolutions)

export default solutionRouter
