import { useLocation } from 'react-router-dom';

import { HomeIcon, TasksIcon } from '../assets/icons/';
import SidebarButton from './SidebarButton';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="h-screen min-w-72 max-w-72 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-brand-primary">
          Task manager
        </h1>
        <p className="text-xs">
          Um simples{' '}
          <span className="text-brand-primary">organizador de tarefas</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton
          color={location.pathname === '/' ? 'selected' : undefined}
        >
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton
          color={location.pathname === '/tasks' ? 'selected' : undefined}
          urlToDirect="/tasks"
        >
          <TasksIcon />
          Minhas tarefas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
