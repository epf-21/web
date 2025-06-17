import { useState } from 'react';
import { useResendCode, useVerifyEmail } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

export default function VerifyEmail() {
  const location = useLocation();
  const email = location.state?.email;
  const [code, setCode] = useState('');
  const { mutate: verify, isPending, isError, error } = useVerifyEmail();
  const { mutate: resend, isPending: isResending, isSuccess: resendSuccess, isError: resendIsError, error: resendError } = useResendCode();

  const handleSubmit = (e) => {
    e.preventDefault();
    verify({ email, code });
  };

  const handleResend = () => {
    resend({ email })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Verifica tu correo</h2>
        <p className="mb-4 text-gray-600">Hemos enviado un código a <strong>{email}</strong>.</p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Codigo de verificación"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-4"
        />

        {isError && (
          <p className="text-sm text-red-500 mb-2">
            {error?.response?.data?.message || 'Error al verificar el código'}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-black-rock-950 text-white rounded-xl hover:bg-black transition-all"
        >
          {isPending ? 'Verificando...' : 'Verificar'}
        </button>
        <div className="text-sm text-center text-gray-600">
          ¿No recibiste el código?{' '}
          <button
            type="button"
            onClick={handleResend}
            className="text-blue-600 hover:underline disabled:opacity-50"
            disabled={isResending}
          >
            {isResending ? 'Enviando...' : 'Reenviar código'}
          </button>
        </div>

        {resendSuccess && (
          <p className="text-green-600 text-sm text-center mt-2">
            Código reenviado correctamente
          </p>
        )}

        {resendIsError && (
          <p className="text-red-500 text-sm text-center mt-2">
            {resendError?.response?.data?.message || 'Error al reenviar el código'}
          </p>
        )}
      </form>
    </div>
  );
}
