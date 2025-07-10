import { useState } from 'react';

import { CloudSunIcon, MoonIcon, SunIcon } from '../assets/icons';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskItem from '../components/TaskItem';
import TasksSeparator from '../components/TasksSeparator';
import { useGetTasks } from '../hooks/data/use-get-tasks';

const Tasks = () => {
  const { data: tasks } = useGetTasks();

  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  const morningTasks = tasks?.filter((tasks) => tasks.period === 'morning');
  const afternoonTasks = tasks?.filter((tasks) => tasks.period === 'afternoon');
  const nightTasks = tasks?.filter((tasks) => tasks.period === 'evening');

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header
          subTitle="Minhas tarefas"
          title="Minhas tarefas"
          addTaskDialogIsOpen={addTaskDialogIsOpen}
          setAddTaskDialogIsOpen={setAddTaskDialogIsOpen}
        />

        <div className="rounded-xl bg-white p-6">
          <div className="space-y-3">
            <TasksSeparator icon={<SunIcon />} title="Manhã" />
            {morningTasks?.length === 0 && (
              <p className="text-sm text-gray-500">
                Nenhuma tarefa para a manhã.
              </p>
            )}
            {morningTasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>

          <div className="my-6 space-y-3">
            <TasksSeparator icon={<CloudSunIcon />} title="Tarde" />
            {afternoonTasks?.length === 0 && (
              <p className="text-sm text-gray-500">
                Nenhuma tarefa para a tarde.
              </p>
            )}
            {afternoonTasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>

          <div className="space-y-3">
            <TasksSeparator icon={<MoonIcon />} title="Noite" />
            {nightTasks?.length === 0 && (
              <p className="text-sm text-gray-500">
                Nenhuma tarefa para a noite.
              </p>
            )}
            {nightTasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
