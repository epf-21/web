import { useMutation } from '@tanstack/react-query';
import { createSolution } from '../services/solution.service';

export const useCreateSolutions = () => {
  return useMutation({
    mutationFn: async ({ id, allAnswers }) => {
      const promises = allAnswers.map(respuestas => createSolution({ id, respuestas }));
      return Promise.all(promises)
    }
  })
}