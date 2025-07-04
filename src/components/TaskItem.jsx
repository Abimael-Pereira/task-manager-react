import PropTypes from 'prop-types';

import {
  CheckIcon,
  DetailsIcon,
  LoaderCircleIcon,
  TrashIcon,
} from '../assets/icons/';
import Button from './Button';

const TaskItem = ({ task, handleCheckStatus, handleDeletTask }) => {
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
        <Button color="ghost" onClick={() => handleDeletTask(task.id)}>
          <TrashIcon className="text-brand-text-gray" />
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
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
  handleCheckStatus: PropTypes.func.isRequired,
  handleDeletTask: PropTypes.func.isRequired,
};

export default TaskItem;
