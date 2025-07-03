import InputLabel from './InputLabel';

const Input = ({ label, errorMessage, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id} label={label} />
      <input
        id={rest.id}
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
      />
      {errorMessage && (
        <span className="text-xs text-red-400">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
