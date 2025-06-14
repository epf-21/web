import prisma from '../../../config/db.js'

export class QuestionModel {
  static async getQuestionById (id) {
    return await prisma.pregunta.findUnique({
      where: { id },
      include: {
        imagenes: true
      }
    })
  }

  static async getQuestionsByLevel ({ nivel, idUsuario }) {
    return await prisma.pregunta.findMany({
      where: {
        nivel,
        idUsuario
      },
      select: {
        id: true,
        titulo: true,
        descripcion: true
      }
    })
  }

  static async createQuestion ({ titulo, descripcion, explicacion, estado, nivel, idUsuario, imagenes }) {
    return await prisma.pregunta.create({
      data: {
        titulo,
        descripcion,
        explicacion,
        estado,
        nivel,
        idUsuario,
        imagenes: {
          create: imagenes.map(({ nombre, url }) => ({
            nombre,
            url
          }))
        }
      },
      include: {
        imagenes: true
      }
    })
  }

  static async deleteQuestionById (id) {
    await prisma.respuesta.deleteMany({
      where: { idPregunta: id }
    })
    await prisma.imagen.deleteMany({
      where: { idPregunta: id }
    })
    return await prisma.pregunta.delete({
      where: { id }
    })
  }

  static async updateQuestionById ({ id, titulo, descripcion, explicacion, estado, nivel, imagenes }) {
    await prisma.imagen.deleteMany({
      where: {
        idPregunta: id
      }
    })

    return await prisma.pregunta.update({
      where: { id },
      data: {
        titulo,
        descripcion,
        explicacion,
        estado,
        nivel,
        imagenes: {
          create: imagenes.map(({ nombre, url }) => ({
            nombre,
            url
          }))
        }
      },
      include: {
        imagenes: true
      }
    })
  }

  static async updateImageMain ({ id, imagenPrincipal }) {
    return await prisma.pregunta.update({
      where: {
        id
      },
      data: {
        imagenPrincipal
      }
    })
  }
}
