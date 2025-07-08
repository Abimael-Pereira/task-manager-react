import { useQuery } from '@tanstack/react-query';

import { api } from '../../../lib/axios';
import { taskQueryKeys } from '../../keys/queries';

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get('/tasks');

      return tasks;
    },
  });
};
