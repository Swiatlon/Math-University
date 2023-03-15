import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from 'views/Root';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ErrorPage from 'views/ErrorPage/ErrorPage';
import Home from 'views/Home/Home';
import SchoolLayout from 'layouts/SchoolLayout';
import Matrices from 'views/University/Matrices/Matrices';
import ComplexNumbers from 'views/University/ComplexNumbers/ComplexNumbers';
import WrittenMath from 'views/ElementarySchool/WrittenMath/WrittenMath';
import GeometricShape from 'views/HighSchool/GeometricShapes/GeometricShapes';
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
                path: 'Algebra-Liniowa',
                children: [
                  {
                    index: true,
                    element: <Navigate to="/error-page" />,
                  },
                  { path: 'Liczby-Zespolone', element: <ComplexNumbers /> },
                ],
              },
            ],
          },
          {
            path: 'Szkoła-Podstawowa',
            children: [
              {
                index: true,
                element: <Navigate to="/error-page" />,
              },
              {
                path: 'Działania',
                children: [
                  {
                    index: true,
                    element: <Navigate to="/error-page" />,
                  },
                  { path: 'Działania-pisemne', element: <WrittenMath /> },
                ],
              },
            ],
          },
          {
            path: 'Szkoła-Średnia',
            children: [
              {
                index: true,
                element: <Navigate to="/error-page" />,
              },
              {
                path: 'Geometria',
                children: [
                  {
                    index: true,
                    element: <Navigate to="/error-page" />,
                  },
                  { path: 'Figury-geometryczne', element: <GeometricShape /> },
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
