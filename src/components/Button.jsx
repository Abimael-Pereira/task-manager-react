import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

const Button = ({ children, color, size, className, ...rest }) => {
  const button = tv({
    base: 'flex items-center justify-center gap-1 rounded-md px-3 font-semibold transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50',
    variants: {
      color: {
        primary: 'bg-brand-primary text-white',
        secondary: 'bg-brand-light-gray text-brand-dark-blue',
        ghost: 'bg-transparent text-brand-dark-gray',
        danger: 'bg-brand-danger text-white',
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

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'lg']),
  className: PropTypes.string,
};

export default Button;
