import { Toaster } from 'sonner';

import Sidebar from './components/Sidebar';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="flex">
      <Toaster richColors />
      <Sidebar />
      <Tasks />
    </div>
  );
}

export default App;
