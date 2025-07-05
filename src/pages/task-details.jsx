import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);

      if (!response.ok) {
        console.error('Failed to fetch task details');
        return;
      }

      const data = await response.json();

      setTask(data);
    };

    fetchTaskDetails();
  }, [taskId]);

  return <h1>{task?.title}</h1>;
};

export default TaskDetailsPage;
