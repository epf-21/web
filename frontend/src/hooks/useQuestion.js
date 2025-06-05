import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteQuestion, getQuestionByLevel } from '../services/question.service';

export const useQuestionByLevel = ({ level, enabled = true }) => {
  return useQuery({
    queryKey: ['questions', level],
    queryFn: () => getQuestionByLevel(level),
    enabled
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