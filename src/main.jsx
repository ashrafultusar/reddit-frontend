import './index.css';
import ReactDOM from 'react-dom/client'; // Add this line to import ReactDOM
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Router';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
