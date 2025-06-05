import { useMutation } from '@tanstack/react-query';
import { register, login } from '../services/auth.service';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      login(data.token);
      navigate('/')
    },
  })
}

export const useLogin = () => {
  const { login: loginStore } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginStore(data.token);
      navigate('/')
    },
  })
}