import { Router } from 'express'
import { QuestionController } from './controllers/question.controller.js'

const questionRouter = Router()

questionRouter.get('/:id', QuestionController.getQuestionDetail)
questionRouter.get('/', QuestionController.findQuestionByYear)
questionRouter.post('/', QuestionController.createQuestion)
questionRouter.delete('/:id', QuestionController.deleteQuestion)

export default questionRouter
