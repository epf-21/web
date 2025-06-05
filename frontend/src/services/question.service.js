import api from '../api/axios'

export const getQuestionByLevel = async (level) => {
  const response = await api.get(`/questions?level=${level}`);
  return response.data.data;
}