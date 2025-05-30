import prisma from '../../../config/db.js'

export class AuthModel {
  static async create (data) {
    return await prisma.usuario.create({
      data
    })
  }

  static async findUserByEmail (email) {
    return await prisma.usuario.findUnique({
      where: { email }
    })
  }
}
