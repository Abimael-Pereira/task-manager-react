import CheckIcon from '../assets/icons/check.svg?react';
import LoaderIcon from '../assets/icons/loader-circle.svg?react';
import DetailsIcon from '../assets/icons/details.svg?react';
import TrashIcon from '../assets/icons/trash.svg?react';
import Button from './Button';

const TaskItem = ({ task, handleCheckStatus, handleDeletTask }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB5] text-[#002C2E]';
    }

    if (task.status === 'in_progress') {
      return 'bg-[#FFAA04] text-[#FFAA04]';
    }

    return 'bg-[#35383E] text-[#35383E] bg-opacity-10';
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
            <LoaderIcon className="text-brand-white animate-spin" />
          )}
        </label>
        <p>{task.title}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => handleDeletTask(task.id)}>
          <TrashIcon className="text-[#9A9C9F]" />
        </Button>
        <a href="#" className="transition-opacity hover:opacity-80">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
