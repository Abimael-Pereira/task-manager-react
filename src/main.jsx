import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import App from './App.jsx';
import TaskDetailsPage from './pages/TaskDetails.jsx';
import Tasks from './pages/Tasks.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/tasks',
    element: <Tasks />,
  },
  {
    path: '/task/:taskId',
    element: <TaskDetailsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
