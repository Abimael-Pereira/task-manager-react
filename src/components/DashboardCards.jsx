import { LayoutListIcon, LoaderCircleIcon, TasksIcon } from '../assets/icons';
import { useGetTasks } from '../hooks/data/use-get-tasks';
import DashboardCard from './DashboardCard';

const DashboardCards = () => {
  const { data: tasks } = useGetTasks();

  const completedTasks =
    tasks?.filter((task) => task.status === 'done').length || 0;
  const ongoingTasks =
    tasks?.filter((task) => task.status === 'in_progress').length || 0;
  const notStartedTasks =
    tasks?.filter((task) => task.status === 'not_started').length || 0;
  const availableTasks = tasks?.length || 0;

  return (
    <div className="grid grid-cols-4 gap-8">
      <DashboardCard
        icon={<LayoutListIcon />}
        mainText={availableTasks}
        secondaryText="Tarefas totais"
      />
      <DashboardCard
        icon={<LoaderCircleIcon />}
        mainText={notStartedTasks}
        secondaryText="Tarefas não iniciadas"
      />
      <DashboardCard
        icon={<LoaderCircleIcon />}
        mainText={ongoingTasks}
        secondaryText="Tarefas em andamento"
      />
      <DashboardCard
        icon={<TasksIcon />}
        mainText={completedTasks}
        secondaryText="Tarefas concluídas"
      />
    </div>
  );
};

export default DashboardCards;
