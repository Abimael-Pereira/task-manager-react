import PropTypes from 'prop-types';

const InputLabel = ({ label, ...rest }) => {
  return (
    <label className="text-sm font-semibold text-brand-dark-blue" {...rest}>
      {label}
    </label>
  );
};

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

export default InputLabel;
