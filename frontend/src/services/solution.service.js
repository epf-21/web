import api from '../api/axios';

export const createSolution = async ({ id, respuestas }) => {
  const response = await api.post(`/solutions/${id}`, { respuestas });
  return response.data;
}