const Button = ({
  children,
  variant = 'primary',
  size = 'sm',
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === 'primary') {
      return 'bg-brand-primary text-white';
    }

    if (variant === 'secondary') {
      return 'bg-brand-light-gray text-brand-dark-blue';
    }

    if (variant === 'ghost') {
      return 'bg-transparent text-brand-dark-gray';
    }

    return 'text-brand-dark-blue';
  };

  const getSizeClasses = () => {
    if (size === 'sm') {
      return 'py-1 text-xs';
    }

    if (size === 'lg') {
      return 'py-2 text-sm';
    }
  };
  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-md px-3 font-semibold transition-opacity hover:opacity-80 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
