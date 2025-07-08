import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '../../../lib/axios';
import { taskMutationKeys } from '../../keys/mutations';
import { taskQueryKeys } from '../../keys/queries';

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.add(),
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post('/tasks', task);

      return createdTask;
    },

    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return [...oldTasks, createdTask];
      });
    },
  });
};
