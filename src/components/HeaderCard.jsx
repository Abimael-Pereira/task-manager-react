const HeaderCard = ({ title, subTitle }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-brand-dark-blue">{title}</h3>
      <span className="text-sm text-brand-text-gray">{subTitle}</span>
    </div>
  );
};

export default HeaderCard;
