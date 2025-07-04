const SidebarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    if (variant === 'selected') {
      return 'bg-brand-primary bg-opacity-10 text-brand-primary';
    }

    return 'text-brand-dark-blue';
  };

  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm ${getVariantClasses()}`}
    >
      {children}
    </a>
  );
};

export default SidebarButton;
