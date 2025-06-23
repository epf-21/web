import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
import FormField from '../../components/FormField';
import Button from '../../components/Button';
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
          <FormField
            label="Correo electrónico"
            name="email"
            type="text"
            value={form.value}
            onChange={handleChange}
            placeholder="ejemplo@gmail.com"
            icon="Mail"
            error={errors.email?.[0]}
          />

          <FormField
            label="Contraseña"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            icon="Lock"
            rightIcon={
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Icon name="EyeOff" /> : <Icon name="Eye" />}
              </button>
            }
            error={errors.password?.[0]}
          />

          {isError && (
            <p className="text-sm text-red-500">
              {error?.response?.data?.message || 'Error al iniciar sesión.'}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            isLoading={isPending}
            loadingText="Iniciando sesión..."
            className="w-full"
          >
            Iniciar Sesión
          </Button>
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
