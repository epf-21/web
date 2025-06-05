import { useQuery } from '@tanstack/react-query';
import { getQuestionByLevel } from '../services/question.service';

export const useQuestionByLevel = ({ level, enabled = true }) => {
  return useQuery({
    queryKey: ['questions', level],
    queryFn: () => getQuestionByLevel(level),
    enabled
  })

}