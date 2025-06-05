/*
  Warnings:

  - You are about to drop the column `edadMaxima` on the `Pregunta` table. All the data in the column will be lost.
  - You are about to drop the column `edadMinima` on the `Pregunta` table. All the data in the column will be lost.
  - Added the required column `nivel` to the `Pregunta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Nivel" AS ENUM ('FACIL', 'MEDIO', 'DIFICIL');

-- AlterTable
ALTER TABLE "Pregunta" DROP COLUMN "edadMaxima",
DROP COLUMN "edadMinima",
ADD COLUMN     "nivel" "Nivel" NOT NULL;
