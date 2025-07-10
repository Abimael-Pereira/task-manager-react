import { useState } from 'react';

import DashboardCards from '../components/DashboardCards';
import DashboardSummaryTasks from '../components/DashboardSummaryTasks';
import Header from '../components/Header';

const HomePage = () => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header
        title="Início"
        subTitle="Início"
        addTaskDialogIsOpen={addTaskDialogIsOpen}
        setAddTaskDialogIsOpen={setAddTaskDialogIsOpen}
      />
      <DashboardCards />
      <div className="grid grid-cols-[1.5fr,1fr] gap-6">
        <DashboardSummaryTasks />
        <div className="h-fit space-y-6 rounded-xl bg-brand-white p-6">
          <p className="text-brand-dark-gray">
            Cada pequena ação de hoje te aproxima mais do seu objetivo de vida.
            <br />
            <span className="font-semibold text-brand-primary">
              Vamos juntos nessa jornada?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
