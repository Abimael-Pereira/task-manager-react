const DashboardCard = ({ icon, mainText, secondaryText }) => {
  return (
    <div className="flex h-[149px] flex-col items-center justify-center gap-1 rounded-lg bg-brand-white text-center">
      <div className="flex items-center gap-2 text-3xl font-semibold text-brand-primary">
        {icon} <p className="text-brand-dark-blue">{mainText}</p>
      </div>
      <span className="text-brand-dark-blue">{secondaryText}</span>
    </div>
  );
};

export default DashboardCard;
