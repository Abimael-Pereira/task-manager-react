import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { tv } from 'tailwind-variants';

const SidebarButton = ({ children, color, urlToDirect = '/' }) => {
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
    <Link to={urlToDirect} className={button({ color })}>
      {children}
    </Link>
  );
};

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['selected', 'default']),
  urlToDirect: PropTypes.string,
};

export default SidebarButton;
