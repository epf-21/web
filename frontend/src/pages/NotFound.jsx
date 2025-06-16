import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <AlertCircle className="mx-auto h-24 w-24 text-black" />
        </div>

        <h1 className="text-6xl font-bold text-black-rock-950 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Página no encontrada
        </h2>

        <p className="text-gray-700 mb-8">
          La página que estás buscando no existe o ha sido movida.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-black-rock-950 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <Home className="h-5 w-5" />
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;