import { useState } from 'react';
import '../Tabs.css'; // Import custom CSS for styling

export default function Home() {
  const [title, setTitle] = useState('');
  const [intruction, setIntruction] = useState('');
  const [image, setImage] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(['']);
  const [alternatives, setAlternatives] = useState([''])
  const [explanation, setExplanation] = useState('');
 
  const handleCorrectAnswerChange = (index, value) => {
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[index] = value;
    setCorrectAnswers(newCorrectAnswers);
  }

  const addItemCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, '']);
  }

  const handleAlternativeChange = (index, value) => {
    const newAlternatives = [...alternatives];
    newAlternatives[index] = value;
    setAlternatives(newAlternatives);
  }

  const addItemAlternative = () => {
    setAlternatives([...alternatives, '']);
  }

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

  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div className="mt-4">
      <h1 className="text-lg font-semibold mb-5 text-center text-gray-900">Crear pregunta de orden de elementos</h1>
    <div className="tabs-container">      
      {/* Tab buttons */}
      <div className="tab-buttons">
        <button
          className={activeTab === 'tab1' ? 'active' : ''}
          onClick={() => handleTabClick('tab1')}
        >
          Pregunta
        </button>
        <button
          className={activeTab === 'tab2' ? 'active' : ''}
          onClick={() => handleTabClick('tab2')}
        >
          Subir Imagenes
        </button>
        <button
          className={activeTab === 'tab3' ? 'active' : ''}
          onClick={() => handleTabClick('tab3')}
        >
          Vista Previa
        </button>        
      </div>

      {/* Tab content */}
      <div className="tab-content">
      
      <form className="mt-4" onSubmit={handleSubmit}>
        {activeTab === 'tab1' && (
          <div>
           <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-900">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Título de la pregunta"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-900">Instrucciones</label>
          <textarea
            value={intruction} onChange={(e) => setIntruction(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Instrucciones para el usuario"
          />
        </div>
        <div className="mb-5">
          
          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Respuestas Correctas</label>
            {correctAnswers.map((item, index) => (
              <input
                key={index}
                value={item}
                onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Añade las respuestas correctas"
              />
            ))}
            <button
              type="button"
              onClick={addItemCorrectAnswer}
              className="py-2 px-5 me-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Agregar Respuesta
            </button>
          </div>
          <div className="mb-5"> 
            <label className="block mb-2 text-sm font-semibold text-gray-900">Alternativas</label>
            {alternatives.map((item, index) => (
              <input
                key={index}
                value={item}
                onChange={(e) => handleAlternativeChange(index, e.target.value)}
                className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Añade las alternativas"
              />
            ))}
            <button
              type="button"
              onClick={addItemAlternative}
              className="py-2 px-5 me-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Agregar Alternativa
            </button>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-900">Explicación</label>
            <textarea
              value={explanation} onChange={(e) => setExplanation(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Explicación de la respuesta correcta"
            />
          </div>
          
        </div>
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
            <h3 className="font-semibold text-lg">Subir imagenes</h3>
            <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-whitem">Imagen</label>
            <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          </div>
        )}
        {activeTab === 'tab3' && (
          <div>
            <h4 className="font-semibold text-lg">Vista Previa</h4>
            <p>aqui viene una imagen de como sera el resultado.</p>
          </div>
        )}
        {activeTab === 'tab4' && (
          <div>
            <h2>Contact</h2>
            <p>Have questions? Feel free to reach out via our contact page or support email.</p>
          </div>
        )}
        <button
            type="submit"
            className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Guardar Pregunta
          </button>
        </form>
      </div>      
    </div>
    </div>
  );
}
