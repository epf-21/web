import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createQuestion, deleteQuestion, getQuestionById, getQuestionByLevel } from '../services/question.service';

export const useQuestionByLevel = ({ level, enabled = true }) => {
  return useQuery({
    queryKey: ['questions', level],
    queryFn: () => getQuestionByLevel(level),
    enabled
  })
}

export const useQuestionById = (id) => {
  return useQuery({
    queryKey: ['question', id],
    queryFn: () => getQuestionById(id),
    enabled: !!id,
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
