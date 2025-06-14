import prisma from '../../../config/db'

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
