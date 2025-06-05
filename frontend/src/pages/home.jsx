import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  BookOpenCheck,
  Brain,
  UserCircle2,
  LogIn,
  UserPlus,
  LogOut,
} from 'lucide-react';

import { useAuthStore } from '../stores/useAuthStore';

export default function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user } = useAuthStore();
  const { logout } = useAuthStore();

  const handleSelect = (age, level) => {
    navigate(`/questions?age=${age}&level=${level}`);
  };

  const togleManu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const levels = [
    { age: '6-8', level: 'facil', label: '6 a 8 años - Fácil', icon: <BookOpenCheck className="w-5 h-5 mr-2" /> },
    { age: '8-10', level: 'medio', label: '8 a 10 años - Medio', icon: <GraduationCap className="w-5 h-5 mr-2" /> },
    { age: '10-12', level: 'dificil', label: '10 a 12 años - Difícil', icon: <Brain className="w-5 h-5 mr-2" /> }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <header className="flex items-center justify-between px-6 py-6 bg-black-rock-950 shadow-sm relative">
        <h1 className="text-xl md:text-2xl font-bold text-white">Editor de preguntas interactivas</h1>

        <div className="relative" ref={dropdownRef}>
          <button onClick={togleManu} className="flex items-center gap-2 text-white">
            {user && <span className="hidden sm:inline text-white font-medium">{user.email}</span>}
            <UserCircle2 className="w-8 h-8" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul className="py-2">
                {user ? (
                  <li
                    className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
                  </li>
                ) : (
                  <>
                    <li
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                      onClick={() => {
                        navigate('/login');
                        setMenuOpen(false);
                      }}
                    >
                      <LogIn className="w-4 h-4 mr-2" /> Login
                    </li>
                    <li
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                      onClick={() => {
                        navigate('/register');
                        setMenuOpen(false);
                      }}
                    >
                      <UserPlus className="w-4 h-4 mr-2" /> Register
                    </li>
                  </>
                )}
              </ul>
            </div>
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
