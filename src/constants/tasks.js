import { v4 } from 'uuid';

const TASKS = [
  {
    id: v4(),
    title: 'Tarefa 01',
    description: 'Descrição da tarefa 01',
    period: 'morning',
    status: 'done',
  },
  {
    id: v4(),
    title: 'Tarefa 02',
    description: 'Descrição da tarefa 02',
    period: 'morning',
    status: 'done',
  },
  {
    id: v4(),
    title: 'Tarefa 03',
    description: 'Descrição da tarefa 03',
    period: 'afternoon',
    status: 'in_progress',
  },
  {
    id: v4(),
    title: 'Tarefa 04',
    description: 'Descrição da tarefa 04',
    period: 'afternoon',
    status: 'in_progress',
  },
  {
    id: v4(),
    title: 'Tarefa 05',
    description: 'Descrição da tarefa 05',
    period: 'evening',
    status: 'not_started',
  },
  {
    id: v4(),
    title: 'Tarefa 06',
    description: 'Descrição da tarefa 06',
    period: 'evening',
    status: 'not_started',
  },
];

export default TASKS;
