import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (updatedTask) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error();
      }

      const updatedData = await response.json();

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
