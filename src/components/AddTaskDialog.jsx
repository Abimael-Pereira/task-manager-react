import './AddTaskDialog.css';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef();

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
      >
        <div className="rounded-xl bg-white p-5 text-center shadow-lg">
          <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
          <p className="mt-1 text-sm text-[#9A9C9F]">
            Insira as informações abaixo
          </p>

          <div className="mt-4 flex w-[336px] flex-col space-y-4">
            <Input id="title" label="Título" placeholder="Título da tarefa" />
            <TimeSelect />
            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
            />

            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button size="lg" className="w-full">
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export default AddTaskDialog;
