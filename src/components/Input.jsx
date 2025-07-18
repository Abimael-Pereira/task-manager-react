import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id} label={label} />
      <input
        id={rest.id}
        className="rounded-lg border border-solid border-brand-light-gray px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  );
});

Input.propTypes = {
  id: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  label: PropTypes.string.isRequired,
};

Input.displayName = 'Input';

export default Input;
