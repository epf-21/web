import { useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [intruction, setIntruction] = useState('');
  const [image, setImage] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(['']);
  const [alternatives, setAlternatives] = useState(['']);
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

  const handleAlternativeChange = (index, value) => {
    const newAlternatives = [...alternatives];
    newAlternatives[index] = value;
    setAlternatives(newAlternatives);
  };

  const addItemAlternative = () => {
    setAlternatives([...alternatives, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      intruction,
      image,
      correctAnswers,
      alternatives,
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
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${activeTab === 'tab1'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => handleTabClick('tab1')}
          >
            Pregunta
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${activeTab === 'tab2'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => handleTabClick('tab2')}
          >
            Subir Imágenes
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${activeTab === 'tab3'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => handleTabClick('tab3')}
          >
            Vista Previa
          </button>
        </div>

        <div className="p-6 bg-gray-50">
          <form onSubmit={handleSubmit}>
            {activeTab === 'tab1' && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-900">
                    Título
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Título de la pregunta"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-900">
                    Instrucciones
                  </label>
                  <textarea
                    value={intruction}
                    onChange={(e) => setIntruction(e.target.value)}
                    className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Instrucciones para el usuario"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-900">
                    Respuestas Correctas
                  </label>
                  {correctAnswers.map((item, index) => (
                    <input
                      key={index}
                      value={item}
                      onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                      className="w-full mb-3 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Añade las respuestas correctas"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={addItemCorrectAnswer}
                    className="py-2 px-5 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
                  >
                    Agregar Respuesta
                  </button>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-900">
                    Alternativas
                  </label>
                  {alternatives.map((item, index) => (
                    <input
                      key={index}
                      value={item}
                      onChange={(e) => handleAlternativeChange(index, e.target.value)}
                      className="w-full mb-3 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Añade las alternativas"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={addItemAlternative}
                    className="py-2 px-5 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
                  >
                    Agregar Alternativa
                  </button>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-900">
                    Explicación
                  </label>
                  <textarea
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Explicación de la respuesta correcta"
                  />
                </div>
              </div>
            )}

            {activeTab === 'tab2' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Subir imágenes</h3>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  Imagen
                </label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {activeTab === 'tab3' && (
              <div>
                <h4 className="font-semibold text-lg">Vista Previa</h4>
                <p className="text-gray-600">Aquí va una imagen de cómo será el resultado.</p>
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Guardar Pregunta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}