import { tv } from 'tailwind-variants';

const Button = ({ children, color, size, className, ...rest }) => {
  const button = tv({
    base: 'flex items-center justify-center gap-1 rounded-md px-3 font-semibold transition-opacity hover:opacity-80',
    variants: {
      color: {
        primary: 'bg-brand-primary text-white',
        secondary: 'bg-brand-light-gray text-brand-dark-blue',
        ghost: 'bg-transparent text-brand-dark-gray',
      },
      size: {
        sm: 'py-1 text-xs',
        lg: 'py-2 text-sm',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'sm',
    },
  });

  return (
    <button className={button({ color, size, className })} {...rest}>
      {children}
    </button>
  );
};

export default Button;
