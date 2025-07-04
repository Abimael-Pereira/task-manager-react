import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  CheckIcon,
  DetailsIcon,
  LoaderCircleIcon,
  TrashIcon,
} from '../assets/icons/';
import Button from './Button';

const TaskItem = ({ task, handleCheckStatus, onDeleteSuccess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      toast.error('Erro ao deletar tarefa. Tente novamente.');
      setDeleteIsLoading(false);
      return;
    }

    onDeleteSuccess();
    toast.success('Tarefa deletada com sucesso!');
    setDeleteIsLoading(false);
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
            onChange={() => handleCheckStatus(task.id)}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderCircleIcon className="animate-spin text-brand-white" />
          )}
        </label>
        <p>{task.title}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderCircleIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>
        <a href="#" className="transition-opacity hover:opacity-80">
          <DetailsIcon />
        </a>
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
  handleCheckStatus: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default TaskItem;
