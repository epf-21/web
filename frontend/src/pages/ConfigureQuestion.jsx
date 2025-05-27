import { useNavigate } from 'react-router-dom';
import Sortable from '../components/Sortable';
import DragDrop from '../components/DragDrop';

export default function ConfigureQuestion() {

  const navigate = useNavigate();

  const title = 'Cual es el orden que esta puesto en la mesa';
  const description = 'Bob puso la mesa';
  const explanation = 'Pon el orden correcto de los objetos en la mesa';
  //const mainImage = 'src/assets/completo2.png';

  const uploadedImages = [
    //'src/assets/tea.png',
    //'src/assets/completo2.png',
    'src/assets/soup_spoon.png',
    'src/assets/saltine_cracker.png',
    'src/assets/plate.png',
    'src/assets/croissant.png',
    //'src/assets/wine_glass.png',
    //'src/assets/bread_white.png',
    'src/assets/mug.png',
    //'src/assets/salt_shaker.png',
    //'src/assets/bread_roll.png'
  ];

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

          <div className="w-md mb-6 border border-dashed border-gray-400 rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Imagen principal</h3>
            <p className='text-gray-500 mb-4'>(Arrastra y suelta para mover los elementos)</p>
            <div className="mx-auto">
               <DragDrop></DragDrop>
            </div>
            
          </div>

          <div className="py-2 rounded-md">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Explicación</h2>
            <p className="text-sm text-gray-700">{explanation}</p>
          </div>

          <div className="py-2 rounded-md">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Agregar respuestas</h2>
            <p className='text-gray-500 mb-4'>(Arrastra y suelta para ordenar los elementos)</p>
            <Sortable></Sortable>
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

        <aside className="w-full md:w-80 border border-gray-300 rounded-lg bg-white p-4 shadow-sm h-[500px] overflow-y-auto">
          <h3 className="text-sm font-semibold text-black-rock-950 mb-4">Imágenes subidas</h3>
          <div className="grid grid-cols-3 gap-3">
            {uploadedImages.map((src, i) => (
              <div
                key={i}
                className="h-20 border border-gray-200 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={src}
                  alt={`img-${i}`}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
