import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/popular",
        element: <div>popular</div>,
      },
      {
        path: "/contact",
        element: <div>contact</div>,
      },
      {
        path: "/join",
        element: <div>join</div>,
      },
    ],
  },
]);
