import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import DragDrop from '../components/DragDrop';

const draggableItemsData = [
  {
    id: 1,
    name: 'Plato',
    imageUrl: 'plate.png',
    x: 0,
    y: 0,
    width: 220,
    height: 220,
    group: 1
  },
  {
    id: 2,
    name: 'Galleta',
    imageUrl: 'saltine_cracker.png',
    x: 0,
    y: 0,
    width: 128,
    height: 128,
    group: 2
  },
  {
    id: 3,
    name: 'Cuchara',
    imageUrl: 'soup_spoon.png',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    group: 3
  },
  {
    id: 4,
    name: 'Taza de Café',
    imageUrl: 'mug.png',
    x: 0,
    y: 0,
    width: 144,
    height: 144,
    group: 4
  },
  {
    id: 5,
    name: 'Cuernito',
    imageUrl: 'croissant.png',
    x: 0,
    y: 0,
    width: 128,
    height: 128,
    group: 5
  },
  {
    id: 6,
    name: 'Pan blanco',
    imageUrl: 'bread_white.png',
    x: 0,
    y: 0,
    width: 128,
    height: 128,
    group: 0
  },
  {
    id: 7,
    name: 'Pastel',
    imageUrl: 'cake.png',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    group: 0
  },
  {
    id: 8,
    name: 'Leche',
    imageUrl: 'milk.png',
    x: 0,
    y: 0,
    width: 128,
    height: 128,
    group: 0
  },
  {
    id: 9,
    name: 'Hamburguesa',
    imageUrl: 'burger.png',
    x: 0,
    y: 0,
    width: 128,
    height: 128,
    group: 0
  },
  {
    id: 10,
    name: 'Caja Cereal',
    imageUrl: 'cereal_box.png',
    x: 0,
    y: 0,
    width: 128,
    height: 128,
    group: 0
  }
]

export default function ConfigureQuestion() {

  const { id } = useParams();

  const navigate = useNavigate();

  const title = '¿Cual es el orden en que estan puestos los objetos en la mesa?';
  const description = 'Bob puso la mesa';
  const explanation = 'Pon el orden correcto de los objetos en la mesa';

  const [draggableItems, setDraggableItems] = useState(draggableItemsData)
  const [droppedItems, setDroppedItems] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="mb-4 border-b pb-2 border-gray-300">
        <h1 className="text-2xl font-bold text-black-rock-950">{title}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
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
            <h2 className="text-lg font-medium text-gray-900 mb-2">Vista previa respuestas</h2>
            <ol>
              <li>
                {droppedItems.map((item, i) => (
                  <div key={i} className="w-12 h-12 inline-block mx-1">
                    <img src={'src/assets/' + item.imageUrl} alt={item.name} />
                  </div>
                ))}
              </li>
            </ol>
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
