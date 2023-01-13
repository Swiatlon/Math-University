import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from 'views/Root';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ErrorPage from 'views/ErrorPage/ErrorPage';
import Home from 'views/Home/Home';
import SchoolLayout from 'layouts/SchoolLayout';
import Matrices from 'views/University/Matrices/Matrices';
import ComplexNumbers from 'views/University/Complex Numbers/ComplexNumbers';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'Matematyka',
        element: <SchoolLayout />,
        // children: [{ path: 'Studia/:subject/:topic', element: <UniversityLayout /> }],
        children: [
          {
            index: true,
            element: <Navigate to="/error-page" />,
          },
          {
            path: 'Studia',
            children: [
              {
                index: true,
                element: <Navigate to="/error-page" />,
              },
              {
                path: 'Statystyka-Opisowa',
                children: [
                  {
                    index: true,
                    element: <Navigate to="/error-page" />,
                  },
                  { path: 'Spearmaan', element: <Matrices /> },
                ],
              },
              {
                path: 'Algebra-Liniowa',
                children: [
                  {
                    index: true,
                    element: <Navigate to="/error-page" />,
                  },
                  { path: 'Macierze', element: <Matrices /> },
                  { path: 'Liczby-Zespolone', element: <ComplexNumbers /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
