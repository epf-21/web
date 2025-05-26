import { useNavigate } from 'react-router-dom';

export default function ConfigureQuestion() {

  const navigate = useNavigate();

  const title = 'Cual es el orden que esta puesto en la mesa';
  const description = 'Bob puso la mesa';
  const explanation = 'Pon el orden correcto de los objetos en la mesa';
  const mainImage = 'src/assets/completo.png';

  const uploadedImages = [
    'src/assets/tea.png',
    'src/assets/soup_spoon.png',
    'src/assets/saltine_cracker.png',
    'src/assets/plate.png'
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

          <div className="w-[500px] h-[350px] mb-6 border border-dashed border-gray-400 rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Imagen principal</h3>
            <div className="w-[400px] h-[250px] mx-auto flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
              <img
                src={mainImage}
                alt="Imagen principal"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          <div className="py-2 rounded-md">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Explicación</h2>
            <p className="text-sm text-gray-700">{explanation}</p>
          </div>

          <div className="py-2 rounded-md">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Agregar respuestas</h2>
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

        <aside className="w-full md:w-64 border border-gray-300 rounded-lg bg-white p-4 shadow-sm h-[500px] overflow-y-auto">
          <h3 className="text-sm font-semibold text-black-rock-950 mb-4">Imágenes subidas</h3>
          <div className="grid grid-cols-2 gap-4">
            {uploadedImages.map((src, i) => (
              <div
                key={i}
                className="h-24 border border-gray-200 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden"
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
