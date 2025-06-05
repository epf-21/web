import { Router } from 'express'
import { QuestionController } from './controllers/question.controller.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const questionRouter = Router()

questionRouter.get('/:id', authMiddleware, QuestionController.getQuestionDetail)
questionRouter.get('/', authMiddleware, QuestionController.findQuestionByYear)
questionRouter.post('/', authMiddleware, QuestionController.createQuestion)
questionRouter.delete('/:id', authMiddleware, QuestionController.deleteQuestion)

export default questionRouter
