/*
  Warnings:

  - The `respuesta` column on the `Respuesta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `PreguntaImagen` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idPregunta` to the `Imagen` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PreguntaImagen" DROP CONSTRAINT "PreguntaImagen_idImagen_fkey";

-- DropForeignKey
ALTER TABLE "PreguntaImagen" DROP CONSTRAINT "PreguntaImagen_idPregunta_fkey";

-- AlterTable
ALTER TABLE "Imagen" ADD COLUMN     "idPregunta" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Respuesta" DROP COLUMN "respuesta",
ADD COLUMN     "respuesta" TEXT[];

-- DropTable
DROP TABLE "PreguntaImagen";

-- AddForeignKey
ALTER TABLE "Imagen" ADD CONSTRAINT "Imagen_idPregunta_fkey" FOREIGN KEY ("idPregunta") REFERENCES "Pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
