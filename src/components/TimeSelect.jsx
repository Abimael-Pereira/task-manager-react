import { forwardRef } from 'react';

import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';

const TimeSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col text-left">
      <InputLabel htmlFor="time" label="Horário" />

      <select
        id="time"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 text-sm text-[#35383E] outline-[#00ADB5]"
        {...props}
        ref={ref}
      >
        <option value="" disabled selected>
          Selecione
        </option>
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
      {props.errorMessage && (
        <InputErrorMessage>{props.errorMessage}</InputErrorMessage>
      )}
    </div>
  );
});

TimeSelect.displayName = 'TimeSelect';

export default TimeSelect;
