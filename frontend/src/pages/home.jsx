import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { LEVELS } from '../constants/levels';

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleSelect = (age, level) => {
    const path = `/questions?age=${age}&level=${level}`;
    if (!user) {
      navigate('/login', { state: { redirectTo: path } })
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Header
        user={user}
        login={() => navigate('/login')}
        logout={handleLogout}
      />
      <main className="px-6 py-10">
        <h2 className="text-3xl font-semibold text-black-rock-950 tracking-wide text-center mb-10 drop-shadow-sm">
          Selecciona una clasificación
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {LEVELS.map(({ age, level, label, icon }) => (
            <div
              key={level}
              onClick={() => handleSelect(age, level)}
              className="cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-black-rock-800 to-black-rock-950 text-white hover:scale-105 transform transition-all duration-200 shadow-xl border border-black-rock-500"
            >
              <div className="flex items-center justify-center mb-4 bg-white/10 p-3 rounded-full">
                <Icon name={icon} className="mr-2" />
              </div>
              <h3 className="text-lg font-semibold text-center">{label}</h3>
              <p className="text-sm text-gray-300 text-center mt-1">
                Edad: {age} &bull; Nivel: {level}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
