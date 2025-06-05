import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  BookOpenCheck,
  Brain,
  UserCircle2,
  LogOut,
} from 'lucide-react';

import { useAuthStore } from '../stores/useAuthStore';

export default function Home() {
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const { logout } = useAuthStore();

  const handleSelect = (age, level) => {
    navigate(`/questions?age=${age}&level=${level}`);
  };
  const levels = [
    { age: '6-8', level: 'facil', label: '6 a 8 años - Fácil', icon: <BookOpenCheck className="w-5 h-5 mr-2" /> },
    { age: '8-10', level: 'medio', label: '8 a 10 años - Medio', icon: <GraduationCap className="w-5 h-5 mr-2" /> },
    { age: '10-12', level: 'dificil', label: '10 a 12 años - Difícil', icon: <Brain className="w-5 h-5 mr-2" /> }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };



  return (
    <div className="min-h-screen bg-white relative">
      <header className="flex items-center justify-between px-6 py-6 bg-black-rock-950 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-white">Editor de preguntas interactivas</h1>
        <div className="flex items-center gap-3 text-white">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hover:text-black-rock-200 transition-colors"
              title="Iniciar sesión"
            >
              <UserCircle2 className="w-8 h-8" />
            </button>
          )}
        </div>
      </header>


      <main className="px-6 py-10">
        <h2 className="text-3xl font-semibold text-black-rock-950 tracking-wide text-center mb-10 drop-shadow-sm">
          Selecciona una clasificación
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {levels.map(({ age, level, label, icon }) => (
            <div
              key={level}
              onClick={() => handleSelect(age, level)}
              className="cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-black-rock-800 to-black-rock-950 text-white hover:scale-105 transform transition-all duration-200 shadow-xl border border-black-rock-500"
            >
              <div className="flex items-center justify-center mb-4 bg-white/10 p-3 rounded-full">
                {icon}
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
