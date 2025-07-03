const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col text-left">
      <label className="text-sm font-semibold text-[#09090B]" htmlFor={rest.id}>
        {label}
      </label>
      <input
        htmlFor={rest.id}
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
      />
    </div>
  );
};

export default Input;
