import { useState } from 'react';
export default function Puerta({msg,emoji}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDoor = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-48 h-64 cursor-pointer overflow-hidden" onClick={toggleDoor}>
        
        <div className="absolute w-48 h-64 bg-amber-800 border-4 border-amber-900 flex justify-center items-center text-9xl">{emoji}</div>
        <div 
          className={`absolute w-44 h-60 bg-amber-700 border-2 border-amber-900 top-2 left-2 transition-transform duration-2000 ease-in-out ${
            isOpen ? 'translate-x-44' : 'translate-x-0'
          }`}
        >
          <div className="absolute w-3 h-3 bg-yellow-600 rounded-full left-3 top-32"></div>
        </div>
      </div>
      
      <p className="mt-4 text-center text-amber-50 font-sans">
          {msg}
      </p>
    </div>
  );
}