import Button from './Button';
import TrashIcon from '../assets/icons/trash.svg?react';
import AddIcon from '../assets/icons/add.svg?react';
import SunIcon from '../assets/icons/sun.svg?react';
import MoonIcon from '../assets/icons/moon.svg?react';
import CloudSunIcon from '../assets/icons/cloud-sun.svg?react';
import TasksSeparator from './TasksSeparator';
import TaskItem from './TaskItem';
import TASKS from '../constants/tasks';
import { useState } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS);

  const morningTasks = tasks.filter((tasks) => tasks.period === 'morning');
  const afternoonTasks = tasks.filter((tasks) => tasks.period === 'afternoon');
  const nightTasks = tasks.filter((tasks) => tasks.period === 'evening');

  const handleCheckedStatus = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;

      if (task.status === 'not_started') {
        return { ...task, status: 'in_progress' };
      }

      if (task.status === 'in_progress') {
        return { ...task, status: 'done' };
      }

      return { ...task, status: 'not_started' };
    });

    setTasks(newTasks);
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant={'ghost'}>
            Limpar tarefas <TrashIcon />
          </Button>
          <Button variant={'primary'}>
            Nova tarefa <AddIcon />
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} title={'Manhã'} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckedStatus={handleCheckedStatus}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator icon={<CloudSunIcon />} title={'Tarde'} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckedStatus={handleCheckedStatus}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator icon={<MoonIcon />} title={'Noite'} />
          {nightTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckedStatus={handleCheckedStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
