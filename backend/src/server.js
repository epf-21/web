import { PORT } from './config/env.js'
import app from './app.js'
import prisma from './config/db.js'

const main = async () => {
  try {
    await prisma.$connect()
    console.log('Conexión a la base de datos exitosa')

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Error al iniciar el servidor: ', error)
    process.exit(1)
  }
}

main()
