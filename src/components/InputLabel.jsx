const InputLabel = ({ label, ...rest }) => {
  return (
    <label className="text-sm font-semibold text-brand-dark-blue" {...rest}>
      {label}
    </label>
  );
};

export default InputLabel;
