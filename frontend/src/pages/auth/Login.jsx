import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../../hooks/useAuth';
import { validateLogin } from '../../schemas/auth.schema';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ email: '', password: '' });
  const { mutate: login, isPending, isError, error } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = validateLogin(form);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    login(form)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white px-4">
      <div className="w-full max-w-sm p-8 rounded-2xl shadow-lg border border-gray-200 bg-white">
        <h2 className="text-2xl font-bold text-center text-black-rock-950 mb-8">
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-rock-950"
                placeholder="correo@gmail.com"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-rock-950"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password[0]}</p>
            )}
          </div>

          {isError && (
            <p className="text-sm text-red-500">
              {error?.response?.data?.message || 'Error al iniciar sesión.'}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-black-rock-950 text-white rounded-xl hover:bg-black transition-all"
          >
            {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          ¿No tienes cuenta? {' '}
          <Link
            to="/register"
            className="text-black-rock-950 font-medium underline"
          >
            Registrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
