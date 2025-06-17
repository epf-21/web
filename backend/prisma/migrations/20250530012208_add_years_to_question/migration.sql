/*
  Warnings:

  - Made the column `nombre` on table `Imagen` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `edadMaxima` to the `Pregunta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edadMinima` to the `Pregunta` table without a default value. This is not possible if the table is not empty.
  - Made the column `titulo` on table `Pregunta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descripcion` on table `Pregunta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `explicacion` on table `Pregunta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estado` on table `Pregunta` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Imagen" ALTER COLUMN "nombre" SET NOT NULL;

-- AlterTable
ALTER TABLE "Pregunta" ADD COLUMN     "edadMaxima" INTEGER NOT NULL,
ADD COLUMN     "edadMinima" INTEGER NOT NULL,
ALTER COLUMN "titulo" SET NOT NULL,
ALTER COLUMN "descripcion" SET NOT NULL,
ALTER COLUMN "explicacion" SET NOT NULL,
ALTER COLUMN "estado" SET NOT NULL;
