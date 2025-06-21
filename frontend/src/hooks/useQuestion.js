import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createQuestion, deleteQuestion,updateQuestion, getQuestionById, getQuestionByLevel, updateMainImage } from '../services/question.service';
import { data } from 'react-router-dom';

export const useQuestionByLevel = ({ level, enabled = true }) => {
  return useQuery({
    queryKey: ['questions', level],
    queryFn: () => getQuestionByLevel(level),
    enabled,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

export const useQuestionById = (id) => {
  return useQuery({
    queryKey: ['question', id],
    queryFn: () => getQuestionById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    }
  })
}

export const useCreateQuestion = () => {
  return useMutation({
    mutationFn: createQuestion,
  })
}

export const useUpdateQuestion = () => {
  return useMutation({
    mutationFn: deleteQuestion,
    onError: (error) => {
      console.error('Error al actualizar la pregunta:', error);
    }
  })
}

export const useUpdateMainImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMainImage,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['question', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
    onError: (error) => {
      console.log('error al actualiza la imagen principal:', error)
    }
  })
}
