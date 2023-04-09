import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './login';
import SignUpPage from './signup';
import HomePage from './home';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignUpPage />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/',
    element: <HomePage />
  }
]);

export function RouterPage() {
  return <RouterProvider router={router}></RouterProvider>;
}
