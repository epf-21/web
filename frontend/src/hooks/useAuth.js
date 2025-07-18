import { useMutation } from '@tanstack/react-query';
import { register, login, verifyEmail, resendCode } from '../services/auth.service';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigate, useLocation } from 'react-router-dom';

export const useRegister = () => {
  return useMutation({
    mutationFn: register
  })
}

export const useVerifyEmail = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      login(data.token);
      navigate('/');
    }
  })
}

export const useResendCode = () => {
  return useMutation({
    mutationFn: resendCode,
  })
}

export const useLogin = () => {
  const { login: loginStore } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.redirectTo || '/';
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginStore(data.token);
      navigate(path)
    },
  })
}