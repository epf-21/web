import prisma from '../../../config/db.js'

export class QuestionModel {
  static async getQuestionById (id) {
    return await prisma.pregunta.findUnique({
      where: { id },
      include: {
        respuestas: true,
        imagenes: {
          include: {
            imagen: true
          }
        }
      }
    })
  }

  static async getQuestionsByEdad (edadMinima, edadMaxima, idUsuario) {
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

  static async createQuestion ({ titulo, descripcion, explicacion, estado, edadMinima, edadMaxima, idUsuario, imagenes }) {
    return await prisma.pregunta.create({
      data: {
        titulo,
        descripcion,
        explicacion,
        estado,
        edadMinima,
        edadMaxima,
        idUsuario,
        imagenes: {
          create: imagenes.map(({ nombre, url }) => ({
            imagen: {
              create: {
                nombre,
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
    })
  }

  static async deleteQuestionById (id) {
    await prisma.respuesta.deleteMany({
      where: { idPregunta: id }
    })
    await prisma.preguntaImagen.deleteMany({
      where: { idPregunta: id }
    })
    return await prisma.pregunta.delete({
      where: { id }
    })
  }
}
