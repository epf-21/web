import { Router } from 'express'
import { QuestionController } from './question.controller.js'

const questionRouter = Router()

questionRouter.get('/:years', QuestionController.findQuestionByYear)

export default questionRouter
