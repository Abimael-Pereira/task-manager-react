import { useQuery } from '@tanstack/react-query';

import { api } from '../../../lib/axios';
import { taskQueryKeys } from '../../keys/queries';

export const useGetTask = ({ taskId, onSuccess }) => {
  return useQuery({
    queryKey: taskQueryKeys.getOne(taskId),
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`);
      onSuccess(task);
      return task;
    },
  });
};
