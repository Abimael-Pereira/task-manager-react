import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderCircleIcon,
  TrashIcon,
} from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [deleteTaskIsLoading, setDeleteTaskIsLoading] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);

      if (!response.ok) {
        console.error('Failed to fetch task details');
        return;
      }

      const data = await response.json();

      setTask(data);
      reset(data);
    };

    fetchTaskDetails();
  }, [taskId, reset]);

  const handleBackPageClick = () => {
    navigate(-1);
  };

  const handleDeleteTask = async () => {
    setDeleteTaskIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      toast.error('Erro ao deletar tarefa, tente novamente.');
      setDeleteTaskIsLoading(false);
      return;
    }

    setDeleteTaskIsLoading(false);

    navigate('/', {
      state: {
        toastMessage: 'Tarefa deletada com sucesso.',
      },
    });
  };

  const handleSaveTaskClick = async (data) => {
    const updatedTask = {
      title: data.title.trim(),
      period: data.period,
      description: data.description.trim(),
    };

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      toast.error('Erro ao atualizar tarefa, tente novamente.');
      return;
    }

    navigate('/', {
      state: {
        toastMessage: 'Tarefa atualizada com sucesso.',
      },
    });
  };

  if (!task) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-brand-white">
        <span className="text-lg font-semibold text-brand-primary">
          Carregando...
        </span>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full px-8 py-16">
        <div>
          <button
            onClick={handleBackPageClick}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary"
          >
            <ArrowLeftIcon />
          </button>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-brand-text-gray">Minhas tarefas</span>
            <ChevronRightIcon className="text-brand-text-gray" />
            <span className="font-semibold text-brand-primary">
              {task?.title}
            </span>
          </div>
          <div className="flex h-full justify-between">
            <h1 className="mt-2 text-xl font-semibold text-brand-dark-blue">
              {task?.title}
            </h1>
            <Button
              onClick={handleDeleteTask}
              className="h-fit self-end"
              color="danger"
              disabled={deleteTaskIsLoading}
            >
              {deleteTaskIsLoading ? (
                <LoaderCircleIcon className="animate-spin text-brand-light-gray" />
              ) : (
                <TrashIcon />
              )}
              Deletar tarefa
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleSaveTaskClick)}>
          <div className="mt-6 space-y-6 rounded-xl bg-brand-white p-6">
            <Input
              id={`title-${task.id}`}
              label="Nome"
              {...register('title', {
                required: 'O título é obrigatório',
                validate: {
                  notEmpty: (value) =>
                    value.trim() !== '' || 'O título não pode ser vazio',
                },
              })}
              errorMessage={errors?.title?.message}
            />
            <TimeSelect
              id={`period-${task.id}`}
              {...register('period', {
                required: 'O período é obrigatório',
              })}
              errorMessage={errors?.period?.message}
            />
            <Input
              id={`description-${task.id}`}
              label="Descrição"
              {...register('description', {
                required: 'A descrição é obrigatória',
                validate: {
                  notEmpty: (value) =>
                    value.trim() !== '' || 'A descrição não pode ser vazia',
                },
              })}
              errorMessage={errors?.description?.message}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button size="lg" color="secondary" onClick={handleBackPageClick}>
              Cancelar
            </Button>
            <Button size="lg" disabled={isSubmitting} type="submit">
              {isSubmitting && (
                <LoaderCircleIcon className="animate-spin text-brand-light-gray" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
