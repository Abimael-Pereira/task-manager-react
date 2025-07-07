import { useEffect, useRef, useState } from 'react';
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
  const [errors, setErrors] = useState([]);
  const [deleteTaskIsLoading, setDeleteTaskIsLoading] = useState(false);
  const [saveTaskIsLoading, setSaveTaskIsLoading] = useState(false);

  const titleRef = useRef();
  const periodRef = useRef();
  const descriptionRef = useRef();

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
    };

    fetchTaskDetails();
  }, [taskId]);

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

  const handleSaveTaskClick = async () => {
    const errors = [];

    if (!titleRef.current.value.trim()) {
      errors.push({ field: 'title', message: 'Título é obrigatório.' });
    }

    if (!descriptionRef.current.value.trim()) {
      errors.push({
        field: 'description',
        message: 'Descrição é obrigatória.',
      });
    }

    if (!periodRef.current.value.trim()) {
      errors.push({ field: 'period', message: 'Período é obrigatório.' });
    }

    if (errors.length > 0) {
      setErrors(errors);
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    setSaveTaskIsLoading(true);

    const updatedTask = {
      title: titleRef.current.value,
      period: periodRef.current.value,
      description: descriptionRef.current.value,
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
      setSaveTaskIsLoading(false);
      return;
    }

    setSaveTaskIsLoading(false);

    navigate('/', {
      state: {
        toastMessage: 'Tarefa atualizada com sucesso.',
      },
    });
  };

  const titleError = errors.find((error) => error.field === 'title');
  const descriptionError = errors.find(
    (error) => error.field === 'description'
  );
  const periodError = errors.find((error) => error.field === 'period');

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

        <div className="mt-6 space-y-6 rounded-xl bg-brand-white p-6">
          <Input
            id={`title-${task.id}`}
            label="Nome"
            defaultValue={task?.title}
            ref={titleRef}
            errorMessage={titleError?.message}
          />
          <TimeSelect
            id={`period-${task.id}`}
            defaultValue={task?.period}
            ref={periodRef}
            errorMessage={periodError?.message}
          />
          <Input
            id={`description-${task.id}`}
            label="Descrição"
            defaultValue={task?.description}
            ref={descriptionRef}
            errorMessage={descriptionError?.message}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button size="lg" color="secondary" onClick={handleBackPageClick}>
            Cancelar
          </Button>
          <Button
            size="lg"
            onClick={handleSaveTaskClick}
            disabled={saveTaskIsLoading}
          >
            {saveTaskIsLoading && (
              <LoaderCircleIcon className="animate-spin text-brand-light-gray" />
            )}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
