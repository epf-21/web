import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Sortable from '../components/Sortable';
import DragDrop from '../components/DragDrop';

const draggableItemsData = [
    {
      id: 6,
      name: 'Pan blanco',
      imageUrl: 'bread_white.png',
      width: 128,
      height: 128,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      id: 7,
      name: 'Pastel',
      imageUrl: 'cake.png',
      width: 100,
      height: 100,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      id: 8,
      name: 'Leche',
      imageUrl: 'milk.png',
      width: 128,
      height: 128,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      id: 9,
      name: 'Hamburguesa',
      imageUrl: 'burger.png',
      width: 128,
      height: 128,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      id: 10,
      name: 'Caja Cereal',
      imageUrl: 'cereal_box.png',
      width: 128,
      height: 128,
      position: {
        x: 0,
        y: 0
      }
    }
  ]
  
  const droppedItemsData = [
    {
      id: 1,
      name: 'Plato',
      imageUrl: 'plate.png',
      width: 240,
      height: 240,
      position: {
        x: 21,
        y: 8
      }
    },
    {
      id: 2,
      name: 'Galleta',
      imageUrl: 'saltine_cracker.png',
      width: 128,
      height: 128,
      position: {
        x: 94,
        y: 36
      }
    },
    {
      id: 3,
      name: 'Cuchara',
      imageUrl: 'soup_spoon.png',
      width: 100,
      height: 100,
      position: {
        x: 126,
        y: 110
      }
    },
    {
      id: 4,
      name: 'Taza de Café',
      imageUrl: 'mug.png',
      width: 144,
      height: 144,
      position: {
        x: 180,
        y: 112
      }
    },
    {
      id: 5,
      name: 'Cuernito',
      imageUrl: 'croissant.png',
      width: 128,
      height: 128,
      position: {
        x: 52,
        y: 65
      }
    }
  ]

export default function ConfigureQuestion() {

  const navigate = useNavigate();

  const title = 'Cual es el orden que esta puesto en la mesa';
  const description = 'Bob puso la mesa';
  const explanation = 'Pon el orden correcto de los objetos en la mesa';  
  
  const [draggableItems, setDraggableItems] = useState(draggableItemsData)
  const [droppedItems, setDroppedItems] = useState(droppedItemsData);
  
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-14">
      <div className="mb-10 border-b pb-6 border-gray-300">
        <h1 className="text-3xl font-bold text-black-rock-950">{title}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Descripción</h2>
            <p className="text-base text-gray-700">{description}</p>
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
            <p className="text-sm text-gray-700">{explanation}</p>
          </div>

          <div className="py-2 rounded-md">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Agregar respuestas</h2>
            <p className='text-gray-500 mb-4'>(Arrastra y suelta para ordenar los elementos)</p>
            <Sortable 
            items={droppedItems}
            setItems={setDroppedItems}
            />
          </div>
          <div className="pt-3">
            <button
              onClick={() => navigate('/preview')}
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
