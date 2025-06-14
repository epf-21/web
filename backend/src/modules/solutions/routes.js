import { Router } from 'express'
import { SolutionController } from './controllers/solution.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

const solutionRouter = Router()

solutionRouter.post('/:id', authMiddleware, SolutionController.createSolutions)

export default solutionRouter
