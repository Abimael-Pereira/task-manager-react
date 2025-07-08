import { useQuery } from '@tanstack/react-query';

export const useGetTask = ({ taskId, onSuccess }) => {
  return useQuery({
    queryKey: ['taskDetails', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);

      if (!response.ok) {
        throw new Error();
      }

      const task = await response.json();

      onSuccess(task);
      return task;
    },
  });
};
