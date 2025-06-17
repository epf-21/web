-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('PROFESOR', 'ADMINISTRADOR');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "email" TEXT NOT NULL,
    "contrasenia" TEXT NOT NULL,
    "telefono" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" TEXT NOT NULL,
    "titulo" TEXT,
    "descripcion" TEXT,
    "explicacion" TEXT,
    "estado" TEXT,
    "idUsuario" TEXT NOT NULL,

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respuesta" (
    "id" TEXT NOT NULL,
    "respuesta" TEXT NOT NULL,
    "idPregunta" TEXT NOT NULL,

    CONSTRAINT "Respuesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imagen" (
    "id" TEXT NOT NULL,
    "nombre" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "Imagen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreguntaImagen" (
    "id" TEXT NOT NULL,
    "idPregunta" TEXT NOT NULL,
    "idImagen" TEXT NOT NULL,

    CONSTRAINT "PreguntaImagen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_idPregunta_fkey" FOREIGN KEY ("idPregunta") REFERENCES "Pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreguntaImagen" ADD CONSTRAINT "PreguntaImagen_idPregunta_fkey" FOREIGN KEY ("idPregunta") REFERENCES "Pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreguntaImagen" ADD CONSTRAINT "PreguntaImagen_idImagen_fkey" FOREIGN KEY ("idImagen") REFERENCES "Imagen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
