import PropTypes from 'prop-types';

const InputErrorMessage = ({ children }) => {
  return <span className="text-xs text-red-400">{children}</span>;
};

InputErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputErrorMessage;
