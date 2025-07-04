import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

const SidebarButton = ({ children, color }) => {
  const button = tv({
    base: 'flex items-center gap-2 rounded-lg px-6 py-3 text-sm',
    variants: {
      color: {
        selected: 'bg-brand-primary bg-opacity-10 text-brand-primary',
        default: 'text-brand-dark-blue',
      },
    },
    defaultVariants: {
      color: 'default',
    },
  });

  return (
    <a href="#" className={button({ color })}>
      {children}
    </a>
  );
};

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['selected', 'default']),
};

export default SidebarButton;
