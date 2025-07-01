const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB51A] text-[#002C2E]';
    }

    if (task.status === 'in_progress') {
      return 'bg-[#FFAA041A] text-[#FFAA04]';
    }

    return 'bg-[#35383E0D] text-[#35383E]';
  };

  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      <p>{task.title}</p>
    </div>
  );
};

export default TaskItem;
