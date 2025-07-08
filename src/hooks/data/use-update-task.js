import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '../../../lib/axios';

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (updatedTask) => {
      const { data: updatedData } = await api.patch(
        `/tasks/${taskId}`,
        updatedTask
      );

      return updatedData;
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return oldTasks.map((task) =>
          task.id === updatedData.id ? updatedData : task
        );
      });
    },
  });
};
