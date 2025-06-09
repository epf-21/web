import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DragDrop from '../components/DragDrop';
import { useQuestionById } from "../hooks/useQuestion";

export default function ConfigureQuestion() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: question, isLoading, error } = useQuestionById(id);

  const [draggableItems, setDraggableItems] = useState([])
  const [droppedItems, setDroppedItems] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!question) return;

    const processedItems = question.images.map((img) => ({
      id: img.id,
      name: img.name,
      imageUrl: img.url,
      x: 0,
      y: 0,
      width: 128,
      height: 128,
      group: 0,
    }));

    setDraggableItems(processedItems);
  }, [question]);

  if (isLoading) return <p className="text-gray-500">Cargando pregunta...</p>;
  if (error) return <p className="text-gray-500">No se pudo cargar la Pregunta.</p>;

  const getPermutations = (arr) =>{
    const permutations = [];  
    function permute(current, remaining) {
      if (remaining.length === 0) {
        permutations.push(current);
        return;
      }

      for (let i = 0; i < remaining.length; i++) {
        const next = current.concat(remaining[i]);
        const rest = remaining.slice(0, i).concat(remaining.slice(i + 1));
        permute(next, rest);
      }
    }  
    permute([], arr);
    return permutations;
  }

  const getAllAnswers = ()=>{    
    const grouppedItems=[]
    for (let i = 0; i < droppedItems.length; i++) {
      grouppedItems.push(droppedItems.filter((x) => x.group === (i+1) ))      
    }
    return grouppedItems
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="mb-4 border-b pb-2 border-gray-300">
        <h1 className="text-2xl font-bold text-black-rock-950">{question.title}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Descripción</h2>
            <p className="text-base text-gray-700">{question.description}</p>
          </div>

          <div className="w-2xl border border-dashed border-gray-400 rounded-lg p-4 bg-white shadow-sm">

            <div className="mx-auto flex gap-4">
              <DragDrop
                draggableItems={draggableItems}
                droppedItems={droppedItems}
                setDraggableItems={setDraggableItems}
                setDroppedItems={setDroppedItems}
              />
            </div>
          </div>

          <div className="py-2 rounded-md">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Explicación</h2>
            <p className="text-sm text-gray-700">{question.explanation}</p>
          </div>

          <div className="py-2 rounded-md">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Vista previa respuestas</h2>
            <ol>              
              {answers.map((arr, i) => (
                <li key={i}> 
                {arr.map((item, j) => (
                  <div key={j} className="w-12 h-12 inline-block mx-1">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                ))}
                </li>
              ))}
            </ol>
          </div>
          <div className="pt-3">
            <button
              onClick={() => navigate(`/preview/${question.id}`)}
              className="px-6 py-3 bg-black-rock-900 text-white rounded-xl text-sm hover:bg-black-rock-950 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
