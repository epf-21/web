import { Router } from 'express'
import { QuestionController } from './controllers/question.controller.js'

const questionRouter = Router()

questionRouter.get('/:years', QuestionController.findQuestionByYear)
questionRouter.post('/create', QuestionController.createQuestion)

export default questionRouter
