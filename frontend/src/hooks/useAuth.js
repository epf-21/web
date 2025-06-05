import { useMutation } from '@tanstack/react-query';
import { register, login } from '../services/auth';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const loginStore = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      loginStore(data.token);
      navigate('/')
    },
  })
}

export const useLogin = () => {
  const loginStore = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginStore(data.token);
      navigate('/')
    },
  })
}