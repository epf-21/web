import { useState } from 'react';
import { useRegister } from '../../hooks/useAuth';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { validateRegister } from '../../schemas/auth.schema';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { mutate: register, isPending, isError, error } = useRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = validateRegister(form);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      console.log('Errores:', formattedErrors);
      setErrors(formattedErrors);
      return;
    }

    register(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white px-4">
      <div className="w-full max-w-sm p-8 rounded-2xl shadow-lg border border-gray-200 bg-white">
        <h2 className="text-2xl font-bold text-center text-black-rock-950 mb-8">
          Crear Cuenta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-rock-950"
                placeholder="Tu nombre"
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name[0]}</p>
            )}
          </div>

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
              {error?.response?.data?.message || 'Error al registrarse'}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-black-rock-950 text-white rounded-xl hover:bg-black transition-all"
          >
            {isPending ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
}
