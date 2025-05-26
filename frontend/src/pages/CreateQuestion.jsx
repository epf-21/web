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
        <h1 className="text-xl md:text-2xl font-bold text-white">Editor de preguntas interactivas</h1>
        <UserCircle2 className="w-8 h-8 text-white" />
      </header>
      <main className="px-6 py-10">
        <h2 className="text-3xl font-semibold text-black-rock-950 tracking-wide text-center mb-10 drop-shadow-sm">
          Crear Pregunta
        </h2>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <QuestionForm
                title={title}
                description={description}
                explanation={explanation}
                onTitleChange={(e) => setTitle(e.target.value)}
                onInstructionChange={(e) => setDescription(e.target.value)}
                onExplanationChange={(e) => setExplanation(e.target.value)}
              />
              <ImageUploader />
              <button
                type="submit"
                className="mt-6 w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white bg-black-rock-900 hover:bg-black-rock-950 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Guardar Pregunta
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}