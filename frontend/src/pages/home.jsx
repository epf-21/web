import { useState } from 'react';
import Tabs from '../components/Tabs/Tabs';
import QuestionForm from '../components/QuestionForm/QuestiomForm';
import ImageUploader from '../components/ImageUploader/ImageUploader';
import PreviewPanel from '../components/PreviewPanel/PreviewPanel';

export default function Home() {
  const [title, setTitle] = useState('');
  const [instruction, setInstruction] = useState('');
  const [image, setImage] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(['']);
  const [explanation, setExplanation] = useState('');
  const [activeTab, setActiveTab] = useState('tab1');

  const handleCorrectAnswerChange = (index, value) => {
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[index] = value;
    setCorrectAnswers(newCorrectAnswers);
  };

  const addItemCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, '']);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      instruction,
      image,
      correctAnswers,
      explanation
    });
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

        <div className="p-6 bg-gray-50">
          <form onSubmit={handleSubmit}>
            {activeTab === 'tab1' && (
              <QuestionForm
                title={title}
                instruction={instruction}
                correctAnswers={correctAnswers}
                explanation={explanation}
                onTitleChange={(e) => setTitle(e.target.value)}
                onInstructionChange={(e) => setInstruction(e.target.value)}
                onAnswerChange={handleCorrectAnswerChange}
                onAddAnswer={addItemCorrectAnswer}
                onExplanationChange={(e) => setExplanation(e.target.value)}
              />
            )}

            {activeTab === 'tab2' && (
              <ImageUploader
                onImageChange={(e) => setImage(e.target.files[0])}
              />
            )}

            {activeTab === 'tab3' && (
              <PreviewPanel />
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