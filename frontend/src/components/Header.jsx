import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import Icon from './Icon';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <header className="flex items-center justify-between px-6 py-6 bg-black-rock-950 shadow-sm">
      <Link to="/">
        <h1 className="text-xl md:text-2xl font-bold text-white">Editor de preguntas interactivas</h1>
      </Link>
      <div className="flex items-center gap-3 text-white">
        {user ? (
          <>
            <span className="hidden sm:inline text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="cursor-pointer"
            >
              <Icon name="LogOut" className="w-6 h-6" />
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="cursor-pointer"
          >
            <Icon name="UserCircle2" className="w-8 h-8" />
          </button>
        )}
      </div>
    </header>
  );
} 