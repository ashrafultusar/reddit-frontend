import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home";
import LogIn from "../Component/LogIn";
import SignUp from "../Component/SignUp";
import CreateCommunity from "../Component/CreateCommunity";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      }, {
        path: '/login',
        element:<LogIn></LogIn>
      },
       {
        path: '/signup',
        element:<SignUp></SignUp>
      },
      {
        path: "/create-community",
        element: <CreateCommunity></CreateCommunity>,
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
