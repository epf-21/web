import { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import ImageUploader from '../components/ImageUploader';
import { useNavigate } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react'


export default function CreateQuestion() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [explanation, setExplanation] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description,
      explanation
    });

    navigate('/Preview', {
      state: {
        title,
        description,
        explanation
      }
    })
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
          <ImageUploader />
          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-6 py-3 bg-black-rock-900 text-white rounded-xl text-sm hover:bg-black-rock-950 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Guardar Pregunta
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}