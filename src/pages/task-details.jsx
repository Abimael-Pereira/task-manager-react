import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

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
            <Button className="h-fit self-end" color="danger">
              <TrashIcon />
              Deletar tarefa
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-6 rounded-xl bg-brand-white p-6">
          <Input label="Nome" placeholder={task?.title} />
          <TimeSelect value={task?.period} />
          <Input label="Descrição" placeholder={task?.description} />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button size="lg" color="secondary">
            Cancelar
          </Button>
          <Button size="lg">Salvar</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
