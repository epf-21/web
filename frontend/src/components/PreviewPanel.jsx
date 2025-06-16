import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { useQuestionById } from '../hooks/useQuestion';

export default function PreviewPanel() {
  const { id } = useParams();

  const [filledBoxes, setFilledBoxes] = useState(0);
  const [currentlyDragging, setCurrentlyDragging] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [options, setOptions] = useState([]);

  const { data: question, isLoading, error } = useQuestionById(id);
  const mainImage = question.imageMain;

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
  };

  const handleCheck = () => {
    if (filledBoxes === boxes.length) {
      alert('¡Muy bien! Has completado el ejercicio correctamente.');
    } else {
      alert('Debes completar todos los espacios antes de comprobar.');
    }
  };

  if (isLoading) return <p className="text-gray-500">Cargando pregunta...</p>;
  if (error) return <p className="text-gray-500">No se pudo cargar la Pregunta.</p>;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="bg-white w-full p-5 max-w-full overflow-hidden">
        <div className="p-6">
          <div className="mb-10 border-b pb-6 border-gray-300">
            <h2 className="text-3xl font-bold text-black-rock-950">{question.title}</h2>
          </div>
          <div className="mb-4">
            <h2 className="text-3xl font-medium text-gray-900 mb-2">Descripción</h2>
            <p className="text-base text-gray-700">{question.description}</p>
          </div>

          <div className="flex justify-center mb-8 ">
            <img
              src={mainImage}
              className="w-48 h-48 object-contain bg-gray-200"
            />
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(filledBoxes / boxes.length) * 100}%` }}
            />
          </div>
          <div className="py-2 rounded-md">
            <h2 className="text-3xl font-medium text-gray-900 mb-2">Explicación</h2>
            <p className="text-sm text-gray-700">{question.explanation}</p>
          </div>

          <div className="flex justify-center flex-wrap gap-4 mb-8">
            {boxes.map((box) => (
              <div
                key={box.id}
                className={`w-28 h-28 flex justify-center items-center rounded-lg transition-all duration-300 cursor-pointer
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
              className="px-6 py-3 bg-gradient-to-r from-black-rock-800 to-black-rock-900 hover:from-black-rock-400 hover:to-black-rock-600 
                text-white font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1"
            >
              Comprobar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}