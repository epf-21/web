import api from "../api/axios";

export const register = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
}

export const verifyEmail = async (data) => {
  const response = await api.post('/auth/verify-email', data)
  return response.data
}

export const resendCode = async (data) => {
  const response = await api.post('/auth/resend-code', data);
  return response.data;
}

export const login = async (data) => {
  const response = await api.post('/auth/login', data);
  return response.data;
}