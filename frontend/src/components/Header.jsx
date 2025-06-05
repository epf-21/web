import { UserCircle2, LogOut } from 'lucide-react';

export default function Header({ user, logout, login }) {
  return (
    <header className="flex items-center justify-between px-6 py-6 bg-black-rock-950 shadow-sm">
      <h1 className="text-xl md:text-2xl font-bold text-white">Editor de preguntas interactivas</h1>
      <div className="flex items-center gap-3 text-white">
        {user ? (
          <>
            <span className="hidden sm:inline text-sm">{user.email}</span>
            <button
              onClick={logout}
              className="hover:text-gray-300 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </>
        ) : (
          <button
            onClick={login}
            className="hover:text-black-rock-200 transition-colors"
            title="Iniciar sesión"
          >
            <UserCircle2 className="w-8 h-8" />
          </button>
        )}
      </div>
    </header>
  );
} 