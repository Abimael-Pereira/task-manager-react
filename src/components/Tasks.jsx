import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons/';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';
import TaskItem from './TaskItem';
import TasksSeparator from './TasksSeparator';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3000/tasks');

      const tasks = await response.json();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const morningTasks = tasks.filter((tasks) => tasks.period === 'morning');
  const afternoonTasks = tasks.filter((tasks) => tasks.period === 'afternoon');
  const nightTasks = tasks.filter((tasks) => tasks.period === 'evening');

  const handleCheckStatus = async (taskId) => {
    let newStatus = '';

    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;

      if (task.status === 'not_started') {
        toast.warning('Tarefa iniciada com sucesso!');
        newStatus = 'in_progress';
        return { ...task, status: 'in_progress' };
      }

      if (task.status === 'in_progress') {
        toast.success('Tarefa concluída com sucesso!');
        newStatus = 'done';
        return { ...task, status: 'done' };
      }

      newStatus = 'not_started';
      toast.info('Tarefa reiniciada com sucesso!');
      return { ...task, status: 'not_started' };
    });

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      toast.error('Erro ao atualizar tarefa. Tente novamente.');
      return;
    }

    setTasks(newTasks);
  };

  const onDeleteTaskSuccess = async (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const onTaskSubmitSuccess = async (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success('Tarefa adicionada com sucesso!');
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color={'ghost'}>
            Limpar tarefas <TrashIcon />
          </Button>
          <Button
            color={'primary'}
            onClick={() => setAddTaskDialogIsOpen(true)}
          >
            Nova tarefa <AddIcon />
          </Button>
        </div>

        <AddTaskDialog
          isOpen={addTaskDialogIsOpen}
          handleClose={() => setAddTaskDialogIsOpen(false)}
          onSubmitSuccess={onTaskSubmitSuccess}
        />
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} title="Manhã" />
          {morningTasks.length === 0 && (
            <p className="text-sm text-gray-500">
              Nenhuma tarefa para a manhã.
            </p>
          )}
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckStatus={handleCheckStatus}
              onDeleteSuccess={() => onDeleteTaskSuccess(task.id)}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator icon={<CloudSunIcon />} title="Tarde" />
          {afternoonTasks.length === 0 && (
            <p className="text-sm text-gray-500">
              Nenhuma tarefa para a tarde.
            </p>
          )}
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckStatus={handleCheckStatus}
              onDeleteSuccess={() => onDeleteTaskSuccess(task.id)}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator icon={<MoonIcon />} title="Noite" />
          {nightTasks.length === 0 && (
            <p className="text-sm text-gray-500">
              Nenhuma tarefa para a noite.
            </p>
          )}
          {nightTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckStatus={handleCheckStatus}
              onDeleteSuccess={() => onDeleteTaskSuccess(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
