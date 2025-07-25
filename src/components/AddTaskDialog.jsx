import './AddTaskDialog.css';

import PropTypes from 'prop-types';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'sonner';
import { v4 } from 'uuid';

import { LoaderCircleIcon } from '../assets/icons';
import { useAddTask } from '../hooks/data/use-add-task';
import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      period: '',
      description: '',
    },
  });

  const nodeRef = useRef();

  const { mutate: addTask } = useAddTask();

  const handleSaveClick = async (data) => {
    const newTask = {
      id: v4(),
      title: data.title.trim(),
      description: data.description.trim(),
      period: data.period,
      status: 'not_started',
    };

    addTask(newTask, {
      onSuccess: () => {
        handleClose();
        reset();
        toast.success('Tarefa adicionada com sucesso!');
      },
      onError: () => {
        reset();
        toast.error('Erro ao adicionar tarefa. Tente novamente.');
      },
    });
  };

  const onCloseButton = () => {
    handleClose();
    reset();
  };

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

          <form
            onSubmit={handleSubmit(handleSaveClick)}
            className="mt-4 flex w-[336px] flex-col space-y-4"
          >
            <Input
              id="title-id"
              label="Título"
              placeholder="Título da tarefa"
              errorMessage={errors?.title?.message}
              disabled={isSubmitting}
              {...register('title', {
                required: 'O título é obrigatório.',
                validate: {
                  notEmpty: (value) =>
                    value.trim() !== '' || 'O título não pode ser vazio.',
                },
              })}
            />
            <TimeSelect
              id="period-id"
              errorMessage={errors?.period?.message}
              disabled={isSubmitting}
              defaultValue=""
              {...register('period', {
                required: 'O período é obrigatório.',
              })}
            />
            <Input
              id="description-id"
              label="Descrição"
              placeholder="Descreva a tarefa"
              errorMessage={errors?.description?.message}
              disabled={isSubmitting}
              {...register('description', {
                required: 'A descrição é obrigatória.',
                validate: {
                  notEmpty: (value) =>
                    value.trim() !== '' || 'A descrição não pode ser vazia.',
                },
              })}
            />

            <div className="flex gap-3">
              <Button
                color="secondary"
                size="lg"
                className="w-full"
                onClick={onCloseButton}
                type="button"
              >
                Cancelar
              </Button>
              <Button
                size="lg"
                className="w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <LoaderCircleIcon className="animate-spin text-brand-light-gray" />
                )}
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddTaskDialog;
