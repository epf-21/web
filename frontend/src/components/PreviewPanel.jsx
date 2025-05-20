import React, { useState, useRef, useEffect } from 'react';
import HeaderPreview from './components/HeaderPreview';

export default function PreviewPanel() {
  const [filledBoxes, setFilledBoxes] = useState(0);
  const [currentlyDragging, setCurrentlyDragging] = useState(null);
  const [boxes, setBoxes] = useState([
    { id: 1, filled: false, content: null },
    { id: 2, filled: false, content: null },
    { id: 3, filled: false, content: null },
    { id: 4, filled: false, content: null },
  ]);

  const [options, setOptions] = useState([
    { id: 1, visible: true, imgSrc: "/api/placeholder/100/100", alt: "Opción 1" },
    { id: 2, visible: true, imgSrc: "/api/placeholder/100/100", alt: "Opción 2" },
    { id: 3, visible: true, imgSrc: "/api/placeholder/100/100", alt: "Opción 3" },
    { id: 4, visible: true, imgSrc: "/api/placeholder/100/100", alt: "Opción 4" },
  ]);
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

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden">
        <HeaderPreview />
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-700 text-lg">
              Ordena las imágenes en el mismo orden que se muestra en la imagen principal
            </p>
          </div>

          <div className="flex justify-center mb-8 ">
            <img
              src="/api/placeholder/220/220"
              className="w-48 h-48 object-contain bg-gray-200"
            />
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
            <div
              className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(filledBoxes / boxes.length) * 100}%` }}
            />
          </div>

          <div className="flex justify-center flex-wrap gap-4 mb-8">
            {boxes.map((box) => (
              <div
                key={box.id}
                className={`w-28 h-28 flex justify-center items-center rounded-lg transition-all duration-300 cursor-pointer
                  ${box.filled
                    ? 'border-2 border-blue-600 bg-blue-50'
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
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                text-white font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1"
            >
              Comprobar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}