import api from '../api/axios';

export const createSolution = async ({ id, respuestas }) => {
  const response = await api.post(`/solutions/${id}`, { respuestas });
  return response.data;
}

export const allSolutions = async (id) => {
  const response = await api.get(`/solutions/${id}`);
  return response.data.data;
}