import { AddIcon, TrashIcon } from '../assets/icons/index.js';
import AddTaskDialog from '../components/AddTaskDialog.jsx';
import Button from '../components/Button';

const Header = ({
  subTitle,
  title,
  addTaskDialogIsOpen,
  setAddTaskDialogIsOpen,
}) => {
  return (
    <div className="flex justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subTitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-3 self-end">
        <Button color={'ghost'}>
          Limpar tarefas <TrashIcon />
        </Button>
        <Button color={'primary'} onClick={() => setAddTaskDialogIsOpen(true)}>
          Nova tarefa <AddIcon />
        </Button>
      </div>

      <AddTaskDialog
        isOpen={addTaskDialogIsOpen}
        handleClose={() => setAddTaskDialogIsOpen(false)}
      />
    </div>
  );
};

export default Header;
