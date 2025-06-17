import api from '../api/axios';

export const getQuestionByLevel = async (level) => {
  const response = await api.get(`/questions?level=${level}`);
  return response.data.data;
}

export const getQuestionById = async (id) => {
  const response = await api.get(`/questions/${id}`);
  return response.data.data;
}

export const deleteQuestion = async (id) => {
  const response = await api.delete(`/questions/${id}`);
  return response.data;
}

export const createQuestion = async (data) => {
  const response = await api.post('/questions', data);
  return response.data;
}

export const updateMainImage = async ({ id, mainImage }) => {
  const response = await api.patch(`/questions/${id}/image-main`, mainImage);
  return response.data;
}