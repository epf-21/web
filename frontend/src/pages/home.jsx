import { useState } from 'react';
import Tabs from '../components/Tabs';
import QuestionForm from '../components/QuestionForm';
import ImageUploader from '../components/ImageUploader';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [explanation, setExplanation] = useState('');
  const [activeTab, setActiveTab] = useState('tab1');

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-4 max-w-3xl mx-auto px-4">
      <h1 className="text-lg font-semibold mb-5 text-center text-gray-900">
        Crear pregunta de orden de elementos
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs activeTab={activeTab} onTabClick={handleTabClick} />

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {activeTab === 'tab1' && (
              <QuestionForm
                title={title}
                description={description}
                explanation={explanation}
                onTitleChange={(e) => setTitle(e.target.value)}
                onInstructionChange={(e) => setDescription(e.target.value)}
                onExplanationChange={(e) => setExplanation(e.target.value)}
              />
            )}

            {activeTab === 'tab2' && (
              <ImageUploader
              />
            )}
            <button
              type="submit"
              className="mt-6 w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Guardar Pregunta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}