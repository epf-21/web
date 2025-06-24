import { Router } from 'express'
import { QuestionController } from './controllers/question.controller.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const questionRouter = Router()

questionRouter.get('/:id', authMiddleware, QuestionController.getQuestionDetail)
questionRouter.get('/', authMiddleware, QuestionController.findQuestionByLevel)
questionRouter.post('/', authMiddleware, QuestionController.createQuestion)
questionRouter.delete('/:id', authMiddleware, QuestionController.deleteQuestion)
questionRouter.put('/:id', authMiddleware, QuestionController.updateQuestion)
questionRouter.patch('/:id/image-main', authMiddleware, QuestionController.updateImageMain)
questionRouter.patch('/:id/images', authMiddleware, QuestionController.updateImages)

export default questionRouter
