import { useState } from 'react';

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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Crear pregunta de ordene de elementos</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Título de la pregunta"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Instrucción</label>
          <textarea
            value={intruction} onChange={(e) => setIntruction(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Instrucción para el usuario"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Imagen</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
          <div>
            <label className="block mb-1 font-medium">Respuestas Correctas</label>
            {correctAnswers.map((item, index) => (
              <input
                key={index}
                value={item}
                onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder="Añade las respuestas correctas"
              />
            ))}
            <button
              type="button"
              onClick={addItemCorrectAnswer}
              className="bg-blue-500 text-white py-1 px-3 rounded mt-2"
            >
              Agregar Respuesta
            </button>
          </div>
          <div>
            <label className="block mb-1 font-medium">Alternativas</label>
            {alternatives.map((item, index) => (
              <input
                key={index}
                value={item}
                onChange={(e) => handleAlternativeChange(index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder="Añade las alternativas"
              />
            ))}
            <button
              type="button"
              onClick={addItemAlternative}
              className="bg-blue-500 text-white py-1 px-3 rounded mt-2"
            >
              Agregar Alternativa
            </button>
          </div>
          <div>
            <label className="block mb-1 font-medium">Explicación</label>
            <textarea
              value={explanation} onChange={(e) => setExplanation(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Explicación de la respuesta correcta"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded"
          >
            Guardar Pregunta
          </button>
        </div>
      </form>
    </div>
  );
}
