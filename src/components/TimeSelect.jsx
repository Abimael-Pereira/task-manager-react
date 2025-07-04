import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';

const TimeSelect = forwardRef(({ errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col text-left">
      <InputLabel htmlFor="time" label="Horário" />

      <select
        id="time"
        className="rounded-lg border border-solid border-brand-light-gray px-4 py-3 text-sm text-brand-dark-blue outline-brand-primary"
        {...rest}
        ref={ref}
        defaultValue=""
      >
        <option value="" disabled>
          Selecione
        </option>
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  );
});

TimeSelect.propTypes = {
  errorMessage: PropTypes.string,
};

TimeSelect.displayName = 'TimeSelect';

export default TimeSelect;
