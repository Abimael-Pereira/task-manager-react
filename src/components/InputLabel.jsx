const InputLabel = ({ label, ...rest }) => {
  return (
    <label className="text-sm font-semibold text-[#09090B]" {...rest}>
      {label}
    </label>
  );
};

export default InputLabel;
