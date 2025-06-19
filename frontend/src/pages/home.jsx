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
      navigate('/login', { state: { redirectTo: path } })
    } else {
      navigate(path);
    }
  };


  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      <main className="px-6 py-10">
        <h2 className="text-3xl font-semibold text-black-rock-950 tracking-wide text-center mb-10 drop-shadow-sm">
          Selecciona una clasificación
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
