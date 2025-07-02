const Button = ({ children, variant = 'primary', ...rest }) => {
  const getVariantClasses = () => {
    if (variant === 'primary') {
      return 'bg-[#00ADB5] text-white';
    }

    if (variant === 'ghost') {
      return 'bg-transparent text-[#818181]';
    }

    return 'text-[#35383E]';
  };
  return (
    <button
      className={`flex items-center gap-1 rounded-md px-3 py-1 text-xs font-semibold transition-opacity hover:opacity-80 ${getVariantClasses()}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
