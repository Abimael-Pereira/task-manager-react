import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '../../../lib/axios';
import { taskMutationKeys } from '../../keys/mutations';
import { taskQueryKeys } from '../../keys/queries';

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`);

      return deletedTask;
    },

    onSuccess: () => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== taskId);
      });
    },
  });
};
