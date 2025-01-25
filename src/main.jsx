import "./index.css";
import ReactDOM from "react-dom/client"; // Add this line to import ReactDOM
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router";
import React from "react";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./Provider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthProvider>

);
