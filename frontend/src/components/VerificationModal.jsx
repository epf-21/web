import { useState } from 'react';
import { useVerifyEmail, useResendCode } from '../hooks/useAuth';
import Icon from './Icon';


export default function VerificationModal({ email, onClose }) {
  const [verificationCode, setVerificationCode] = useState('');

  const { mutate: verify, isPending: isVerifying, isError: verifyError, error: verifyErrorData } = useVerifyEmail();
  const { mutate: resend, isPending: isResending, isSuccess: resendSuccess, isError: resendIsError, error: resendError } = useResendCode();

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    verify({ email, code: verificationCode });
  };

  const handleResend = () => {
    resend({ email });
  };

  const handleClose = () => {
    setVerificationCode('');
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="X" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-900">Verifica tu correo</h2>
        <p className="mb-6 text-gray-600">
          Hemos enviado un código de verificación a <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerifySubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Código de verificación"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-rock-950"
              maxLength={6}
            />
          </div>

          {verifyError && (
            <p className="text-sm text-red-500">
              {verifyErrorData?.response?.data?.message || 'Error al verificar el código'}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-black-rock-950 text-white rounded-xl hover:bg-black transition-all"
            disabled={isVerifying}
          >
            {isVerifying ? 'Verificando...' : 'Verificar'}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
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
      </div>
    </div>
  );
}