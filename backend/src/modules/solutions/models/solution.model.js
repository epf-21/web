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

  static async findSolutionsById (id) {
    return await prisma.respuesta.findUnique({
      where: {
        id
      }
    })
  }

  static async deleteSolutionById (id) {
    return await prisma.respuesta.delete({
      where: {
        id
      }
    })
  }

  static async deleteAllSolutions (idPregunta) {
    return await prisma.respuesta.deleteMany({
      where: {
        idPregunta
      }
    })
  }
}
