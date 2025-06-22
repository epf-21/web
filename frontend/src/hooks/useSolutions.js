import { useMutation, useQuery } from '@tanstack/react-query';
import { allSolutions, createSolution } from '../services/solution.service';

export const useCreateSolutions = () => {
  return useMutation({
    mutationFn: async ({ id, allAnswers }) => {
      const promises = allAnswers.map(respuestas => createSolution({ id, respuestas }));
      return Promise.all(promises)
    }
  })
}

export const useAllSolutions = (id) => {
  return useQuery({
    queryKey: ['solutions', id],
    queryFn: () => allSolutions(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}