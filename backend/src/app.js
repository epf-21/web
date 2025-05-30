import express, { json } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js'
import authRouter from './modules/auth/auth.routes.js'
const app = express()

app.use(cors())
app.use(json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Editor de preguntas interactivas')
})

app.use('/api/auth', authRouter)

app.use(errorHandler)

export default app
