import api from '../api/axios'

export const getQuestionByLevel = async (level) => {
  const response = await api.get(`/questions?level=${level}`);
  return response.data.data;
}

export const deleteQuestion = async (id) => {
  const response = await api.delete(`/questions/${id}`)
  return response.data;
}