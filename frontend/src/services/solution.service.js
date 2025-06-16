import api from '../api/axios';

export const createSolution = async (id, data) => {
  const response = await api.post(`/solutions/${id}`, data);
  return response.data;
}