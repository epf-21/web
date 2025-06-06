import { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import ImageUploader from '../components/ImageUploader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react'
import { useImageUploader } from '../hooks/useImageUploader';
import { useUploadImages } from '../hooks/useUploadImage';
import { useCreateQuestion } from '../hooks/useQuestion';

export default function CreateQuestion() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const age = searchParams.get('age');
  const level = searchParams.get('level')?.toUpperCase();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [explanation, setExplanation] = useState('');
  const { images, imageURLS, onSelectChange, removeFile } = useImageUploader();

  console.log(age);

  const { mutateAsync: uploadImages, isPending } = useUploadImages();
  const { mutate: createQuestion } = useCreateQuestion();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadedImages = await uploadImages(images);
      const questionData = {
        titulo: title,
        descripcion: description,
        explicacion: explanation,
        estado: "ACTIVA",
        nivel: level,
        imagenes: uploadedImages,
      };

      createQuestion(questionData, {
        onSuccess: () => {
          navigate('/configure-question');
        },
        onError: () => {
          alert('Error al crear la pregunta')
        }
      })
    } catch (error) {
      console.error(error);
      alert('Error al subir las imágenes');
    }

  };

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-6 bg-black-rock-950 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Editor de preguntas interactivas
        </h1>
        <UserCircle2 className="w-8 h-8 text-white" />
      </header>
      <main className="w-full px-6 md:px-12 py-10">
        <h2 className="text-3xl font-bold mb-10 text-black-rock-950 text-center">
          Crear Nueva Pregunta
        </h2>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Llenar el formulario
        </h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <QuestionForm
            title={title}
            description={description}
            explanation={explanation}
            onTitleChange={(e) => setTitle(e.target.value)}
            onInstructionChange={(e) => setDescription(e.target.value)}
            onExplanationChange={(e) => setExplanation(e.target.value)}
          />
          <ImageUploader
            imageURLS={imageURLS}
            onSelectChange={onSelectChange}
            removeFile={removeFile}
          />
          <div className="flex justify-start pt-3">
            <button
              type="submit"
              className="px-6 py-3 bg-black-rock-900 text-white rounded-xl text-sm hover:bg-black-rock-950 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Crear Pregunta
            </button>
          </div>
        </form>
        {isPending && <p className="text-gray-500"> Subiendo imagenes</p>}
      </main>
    </div>
  );
}