import { useState } from 'react';
import { useRegister } from '../../hooks/useAuth';
import { validateRegister } from '../../schemas/auth.schema';
import VerificationModal from '../../components/VerificationModal';
import FormField from '../../components/FormField';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
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

    register(form, {
      onSuccess: (data) => {
        if (data.requiresVerification) {
          setRegisteredEmail(data.email || form.email);
          setShowModal(true)
        }
      },
    });
  };


  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white px-4">
        <div className="w-full max-w-sm p-8 rounded-2xl shadow-lg border border-gray-200 bg-white">
          <h2 className="text-2xl font-bold text-center text-black-rock-950 mb-8">
            Crear Cuenta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              label="Nombre completo"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              icon="User"
              error={errors.name?.[0]}
            />

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
                {error?.response?.data?.message || 'Error al registrarse'}
              </p>
            )}

            <Button
              type="submit"
              disabled={isPending}
              isLoading={isPending}
              loadingText="Registrando..."
              className="w-full"
            >
              Resgistrase
            </Button>
          </form>
        </div>
      </div>

      {showModal && (
        <VerificationModal
          email={registeredEmail}
          onClose={closeModal}
        />
      )}
    </>
  );
}
