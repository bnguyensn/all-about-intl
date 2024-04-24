import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage.tsx';
import { NumberFormatPage } from './pages/NumberFormatPage.tsx';
import { DateTimeFormatPage } from './pages/DateTimeFormatPage.tsx';
import './index.css';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NumberFormatPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/datetime',
    element: <DateTimeFormatPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
