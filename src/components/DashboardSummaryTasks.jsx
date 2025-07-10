import { useGetTasks } from '../hooks/data/use-get-tasks';
import HeaderCard from './HeaderCard';
import TaskItem from './TaskItem';

const DashboardSummaryTasks = () => {
  const { data: tasks } = useGetTasks();

  if (!tasks || tasks.length === 0) {
    return (
      <div className="h-fit w-full space-y-6 rounded-xl bg-brand-white p-6">
        <HeaderCard title="Tarefas" subTitle="Nenhuma tarefa disponível" />
      </div>
    );
  }

  return (
    <div className="h-fit w-full space-y-6 rounded-xl bg-brand-white p-6">
      <HeaderCard title="Tarefas" subTitle="Resumo das tarefas disponíveis" />
      <div className="space-y-3">
        {tasks?.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default DashboardSummaryTasks;
