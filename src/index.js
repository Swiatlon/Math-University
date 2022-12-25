import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from 'views/Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from 'views/ErrorPage/ErrorPage';
import Home from 'views/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
