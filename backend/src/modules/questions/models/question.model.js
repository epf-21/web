import prisma from '../../../config/db.js'

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
  static async createQuestion(titulo, descripcion, explicacion, urlsImagenes, idUsuario) {
    return await prisma.pregunta.create({
      data: {
        titulo,
        descripcion,
        explicacion,
        estado: 'ACTIVO',
        edadMinima: 0,
        edadMaxima: 99,
        idUsuario,
        imagenes: {
          create: urlsImagenes.map(url => ({
            imagen: {
              create: {
                nombre: 'imagen',
                url
              }
            }
          }))
        }
      },
      include: {
        imagenes: {
          include: {
            imagen: true
          }
        }
      }
    });
  }
}
