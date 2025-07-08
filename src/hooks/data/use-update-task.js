import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '../../../lib/axios';
import { taskMutationKeys } from '../../keys/mutations';
import { taskQueryKeys } from '../../keys/queries';

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (updatedTask) => {
      const { data: updatedData } = await api.patch(
        `/tasks/${taskId}`,
        updatedTask
      );

      return updatedData;
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.map((task) =>
          task.id === updatedData.id ? updatedData : task
        );
      });
    },
  });
};
