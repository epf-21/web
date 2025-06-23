import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useQuestionById } from '../hooks/useQuestion';
import { useAllSolutions } from '../hooks/useSolutions';
import { LEVELS } from '../constants/levels';

export default function PreviewPanel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [filledBoxes, setFilledBoxes] = useState(0);
  const [currentlyDragging, setCurrentlyDragging] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [options, setOptions] = useState([]);

  const { data: question, isLoading, error } = useQuestionById(id);
  const { data: solutions, isLoading: isLoadingSolutions, error: errorSolutions } = useAllSolutions(id);
  const mainImage = question?.imageMain;

  console.log(question)

  useEffect(() => {
    if (!question || !question.images) return;

    const formattedOptions = question.images.map((img) => ({
      id: img.id,
      visible: true,
      imgSrc: img.url,
      alt: img.name,
    }));

    setOptions(formattedOptions);

    const initialBoxes = formattedOptions.map((_, index) => ({
      id: index + 1,
      filled: false,
      content: null,
    }));

    setBoxes(initialBoxes);
    setFilledBoxes(0);
  }, [question]);

  const handleDragStart = (optionId) => {
    setCurrentlyDragging(optionId);
  };

  const handleDrop = (boxId) => {
    const targetBox = boxes.find(box => box.id === boxId);
    if (targetBox.filled) return;

    const draggedOption = options.find(option => option.id === currentlyDragging);
    if (!draggedOption) return;

    setBoxes(boxes.map(box =>
      box.id === boxId
        ? { ...box, filled: true, content: draggedOption }
        : box
    ));
    setOptions(options.map(option =>
      option.id === currentlyDragging
        ? { ...option, visible: false }
        : option
    ));

    setFilledBoxes(filledBoxes + 1);
  };

  const handleRemove = (boxId) => {
    const boxToEmpty = boxes.find(box => box.id === boxId);
    if (!boxToEmpty || !boxToEmpty.filled) return;

    const optionId = boxToEmpty.content.id;

    setBoxes(boxes.map(box =>
      box.id === boxId
        ? { ...box, filled: false, content: null }
        : box
    ));

    setOptions(options.map(option =>
      option.id === optionId
        ? { ...option, visible: true }
        : option
    ));

    setFilledBoxes(filledBoxes - 1);
  };

  const handleReset = () => {
    setBoxes(boxes.map(box => ({ ...box, filled: false, content: null })));
    setOptions(options.map(option => ({ ...option, visible: true })));
    setFilledBoxes(0);
    setMessage(null)
  };

  const handleCheck = () => {
    if (filledBoxes !== boxes.length) {
      setMessage({
        type: 'error',
        message: 'Debes completar todos los espacios antes de verificar.'
      });
      return;
    }

    const userSolution = boxes.map(box => box.content?.id).filter(Boolean);
    const correctSolutions = Object.values(solutions || {});
    console.log(correctSolutions)

    const isCorrect = correctSolutions.some(
      (solution) => JSON.stringify(solution) === JSON.stringify(userSolution)
    );

    setMessage({
      type: isCorrect ? 'success' : 'error',
      message: isCorrect
        ? '¡Muy bien! Has completado correctamente.'
        : 'Respuesta incorrecta. Intenta nuevamente.'
    });
  };

  const handleGoBack = () => {
    if (!question?.level) return;

    const levelLower = question.level.toLowerCase();
    const found = LEVELS.find(l => l.level === levelLower);

    if (found) {
      navigate(`/questions?age=${found.age}&level=${found.level}`);
    }
  };

  if (isLoading || isLoadingSolutions) return <p className="text-gray-500">Cargando pregunta...</p>;
  if (error || errorSolutions) return <p className="text-gray-500">No se pudo cargar la Pregunta o las soluciones.</p>;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="bg-white w-full p-5 max-w-full overflow-hidden">
        <div className="p-6">
          <div className="mb-10 border-b pb-6 border-gray-300">
            <h2 className="text-3xl font-bold text-black-rock-950">{question.title}</h2>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={handleGoBack}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a listado de preguntas
            </button>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-medium text-gray-900 mb-2">Descripción</h2>
            <p className="text-base text-gray-700">{question.description}</p>
          </div>

          <div className="flex justify-center mb-8">
            <img
              src={mainImage}
              alt="Imagen principal"
              className="w-80 h-64 object-contain bg-gray-200"
            />
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(filledBoxes / boxes.length) * 100}%` }}
            />
          </div>

          <div className="py-2 rounded-md">
            <h2 className="text-xl font-medium text-gray-900 mb-2">Explicación</h2>
            <p className="text-sm text-gray-700">{question.explanation}</p>
          </div>

          {message && (
            <p
              className={`my-4 px-4 py-3 rounded-lg text-sm font-medium border
              ${message.type === 'success'
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : 'bg-red-100 text-red-800 border-red-300'}
              `}
            >
              {message.message}
            </p>
          )}


          <div className="flex justify-center flex-wrap gap-4 mb-8">
            {boxes.map((box) => (
              <div
                key={box.id}
                className={`w-24 h-24 flex justify-center items-center rounded-lg transition-all duration-300 cursor-pointer
                  ${box.filled
                    ? 'border-2 border-black-rock-800 bg-blue-50'
                    : 'border-2 border-dashed border-gray-500 bg-gray-50 hover:border-blue-400'
                  }`}
                onDrop={() => handleDrop(box.id)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => {
                  e.preventDefault();
                  if (!box.filled) {
                    e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
                    e.currentTarget.classList.remove('border-dashed');
                  }
                }}
                onDragLeave={(e) => {
                  if (!box.filled) {
                    e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
                    e.currentTarget.classList.add('border-dashed');
                  }
                }}
                onClick={() => box.filled && handleRemove(box.id)}
              >
                {box.filled && box.content && (
                  <div className="w-full h-full p-1">
                    <img
                      src={box.content.imgSrc}
                      alt={box.content.alt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center flex-wrap gap-4 mb-8">
            {options.map((option) => (
              <div
                key={option.id}
                className={`w-24 h-24 border-2 border-gray-200 bg-gray-200 rounded-lg overflow-hidden cursor-grab 
                  transition-all duration-300 hover:scale-105 hover:shadow-md
                  ${!option.visible ? 'invisible' : ''}`}
                draggable={option.visible}
                onDragStart={() => handleDragStart(option.id)}
              >
                <img
                  src={option.imgSrc}
                  alt={option.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-full 
                transition-all duration-300 transform hover:-translate-y-1"
            >
              Reiniciar
            </button>
            <button
              onClick={handleCheck}
              className="px-6 py-3 bg-black-rock-900 hover:bg-black-rock-950 text-white font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1"
            >
              Verificar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
