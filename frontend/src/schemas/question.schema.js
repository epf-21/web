import { z } from 'zod';

const questionSchema = z.object({
  titulo: z.string()
    .min(5, 'El titulo debe tener al menos 4 caracteres'),
  descripcion: z.string()
    .min(8, 'La descripcion debe tener al menos 8 caracteres'),
  explicacion: z.string()
    .min(8, 'La explicación debe tener al menos 8 catacteres'),
  nivel: z.string()
    .nonempty('Nivel requerido'),
  imagenes: z.array(
    z.object({
      nombre: z.string().min(1, 'El nombre de la imagen es requerida'),
      url: z.string().url('La URL de la imagen no es válida'),
    })
  ),
})

export const validateQuestion = (data) => questionSchema.safeParse(data);
