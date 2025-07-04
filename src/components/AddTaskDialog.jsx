import './AddTaskDialog.css';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'sonner';
import { v4 } from 'uuid';

import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [errors, setErrors] = useState([]);

  const nodeRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const periodRef = useRef();

  useEffect(() => {
    setErrors([]);
  }, [isOpen]);

  const handleSaveClick = () => {
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

    handleSubmit({
      id: v4(),
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      period: periodRef.current.value,
      status: 'not_started',
    });
  };

  const titleError = errors.find((error) => error.field === 'title');
  const descriptionError = errors.find(
    (error) => error.field === 'description'
  );
  const periodError = errors.find((error) => error.field === 'period');

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
          <h2 className="text-xl font-semibold text-brand-dark-blue">
            Nova Tarefa
          </h2>
          <p className="mt-1 text-sm text-brand-text-gray">
            Insira as informações abaixo
          </p>

          <div className="mt-4 flex w-[336px] flex-col space-y-4">
            <Input
              id="title"
              label="Título"
              placeholder="Título da tarefa"
              errorMessage={titleError?.message}
              ref={titleRef}
            />
            <TimeSelect errorMessage={periodError?.message} ref={periodRef} />
            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
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
              <Button size="lg" className="w-full" onClick={handleSaveClick}>
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
