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
import { useDeleteTask } from '../hooks/data/use-delete-task';
import { useGetTask } from '../hooks/data/use-get-task';
import { useUpdateTask } from '../hooks/data/use-update-task';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: task, isPending: isTaskLoading } = useGetTask({
    taskId,
    onSuccess: (task) => reset(task),
  });

  const { mutate: deleteMutate, isPending: isDeleteLoading } =
    useDeleteTask(taskId);

  const { mutate: updateMutate, isPending: isUpdateLoading } =
    useUpdateTask(taskId);

  const handleDeleteTask = async () => {
    deleteMutate(task.id, {
      onSuccess: () => {
        navigate('/tasks', {
          state: {
            toastMessage: 'Tarefa deletada com sucesso.',
          },
        });
      },

      onError: () => {
        toast.error('Erro ao deletar tarefa, tente novamente.');
      },
    });
  };

  const handleSaveTaskClick = async (data) => {
    const updatedTask = {
      title: data.title.trim(),
      period: data.period,
      description: data.description.trim(),
    };

    updateMutate(updatedTask, {
      onSuccess: () => {
        navigate('/tasks', {
          state: {
            toastMessage: 'Tarefa atualizada com sucesso.',
          },
        });
      },

      onError: () => {
        toast.error('Erro ao atualizar tarefa, tente novamente.');
      },
    });
  };

  if (isTaskLoading) {
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
            onClick={() => navigate(-1)}
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
              disabled={isDeleteLoading || isUpdateLoading}
            >
              {isDeleteLoading ? (
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
            <Button
              size="lg"
              color="secondary"
              onClick={() => navigate(-1)}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              size="lg"
              disabled={isUpdateLoading || isDeleteLoading}
              type="submit"
            >
              {isUpdateLoading && (
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
