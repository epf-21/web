import prisma from '../../config/db.js'

export class QuestionModel {
  static async getQuestionsByEdad(edadMinima, edadMaxima, idUsuario) {
    return await prisma.pregunta.findMany({
      where: {
        edadMinima,
        edadMaxima,
        idUsuario
      },
      select: {
        id: true,
        titulo: true,
        descripcion: true
      }
    })
  }
}
