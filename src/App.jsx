import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import Sidebar from './components/Sidebar';
import Tasks from './components/Tasks';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  );
}

export default App;
