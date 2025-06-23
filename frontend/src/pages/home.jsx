import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import Header from '../components/Header';
import { LEVELS } from '../constants/levels';
import LevelCard from '../components/LevelCard';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleSelect = (age, level) => {
    const path = `/questions?age=${age}&level=${level}`;
    if (!user) {
      navigate('/login', { state: { redirectTo: path } });
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100">
      <Header />
      <main className="px-6 py-15 text-center">
        <h2 className="text-4xl font-bold text-black-rock-950 mb-4">
          Selecciona una clasificación
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-12">
          Crea preguntas adaptadas a diferentes niveles de dificultad para tus estudiantes
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {LEVELS.map(({ age, level, label, icon }) => (
            <LevelCard
              key={level}
              age={age}
              level={level}
              label={label}
              icon={icon}
              onClick={() => handleSelect(age, level)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

