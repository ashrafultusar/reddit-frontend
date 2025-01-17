import "./index.css";
import ReactDOM from "react-dom/client"; // Add this line to import ReactDOM
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router";
import React from "react";
import ApplicationSharedContext from "./contexts/ApplicationSharedContext";
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApplicationSharedContext>
    <ToastContainer />
      <RouterProvider router={router} />
    </ApplicationSharedContext>
  </React.StrictMode>
);
