import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import Sidebar from './components/Sidebar';
import HomePage from './pages/Home';

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
      <HomePage />
    </div>
  );
}

export default App;
