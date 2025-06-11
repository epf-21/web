-- AlterTable
ALTER TABLE "Pregunta" ADD COLUMN     "imagenPrincipal" TEXT;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "rol" SET DEFAULT 'PROFESOR';
