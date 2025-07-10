import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import {
  CheckIcon,
  DetailsIcon,
  LoaderCircleIcon,
  TrashIcon,
} from '../assets/icons/';
import { useDeleteTask } from '../hooks/data/use-delete-task';
import { useUpdateTask } from '../hooks/data/use-update-task';
import Button from './Button';

const TaskItem = ({ task }) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id);

  const { mutate: updateTask } = useUpdateTask(task.id);

  const handleCheckStatus = () => {
    const newStatus = () => {
      if (task.status === 'not_started') {
        return 'in_progress';
      }

      if (task.status === 'in_progress') {
        return 'done';
      }

      return 'not_started';
    };

    updateTask(
      { status: newStatus() },
      {
        onSuccess: () => {
          toast.success('Status da tarefa atualizado com sucesso!');
        },
        onError: () => {
          toast.error('Erro ao atualizar status da tarefa, tente novamente.');
        },
      }
    );
  };

  const handleDeleteClick = async () => {
    deleteTask(task.id, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa, tente novamente.');
      },
    });
  };

  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-brand-primary text-brand-dark-blue';
    }

    if (task.status === 'in_progress') {
      return 'bg-brand-process text-brand-process';
    }

    return 'bg-brand-dark-blue text-brand-dark-blue bg-opacity-10';
  };

  return (
    <div
      className={`flex items-center justify-between rounded-lg bg-opacity-10 px-4 py-3 text-sm transition-colors ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleCheckStatus}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderCircleIcon className="animate-spin text-brand-white" />
          )}
        </label>
        <p>{task.title}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderCircleIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>
        <Link
          to={`/task/${task.id}`}
          className="transition-opacity hover:opacity-80"
        >
          <DetailsIcon />
        </Link>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    period: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
};

export default TaskItem;
