import prisma from '../../../config/db.js'

export class SolutionModel {
  static async createSolutions (idPregunta, respuestas) {
    return await prisma.respuesta.create({
      data: {
        idPregunta,
        respuesta: respuestas
      }
    })
  }
}
