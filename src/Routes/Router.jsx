import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home";
import LogIn from "../Component/LogIn";
import SignUp from "../Component/SignUp";
import CreateCommunity from "../Component/CreateCommunity";
import CreatePost from "../Component/CreatePost";
import PostDetails from "../Component/PostDetails";
import ViewCommunity from "../Component/ViewCommunity";
import UserProfile from "../Page/UserProfile";
import AdminProfile from "../Page/AdminProfile";
import CommentPage from "../Component/CommentPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UpdateCommunity from "../Component/UpdateCommunity";
import UpdatePost from "../Component/UpdatePost";
import UpdateComment from "../Component/UpdateComment";
import UpdateAdminCommunity from "../Admin/UpdateAdminCommunity";

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
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/create-community",
        element: <CreateCommunity></CreateCommunity>,
      },
      {
        path: "/create-post",
        element: <CreatePost></CreatePost>,
      },
      {
        path: "/postD/:postId",
        element: (
          <PrivateRoute>
            <PostDetails></PostDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "community/:communityName",
        element: <ViewCommunity></ViewCommunity>,
      },
      {
        path: "/user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/admin-profile",
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "/comment-page/:id",
        element: <CommentPage></CommentPage>,
      },
      {
        path: "/updateCommunity/:communityId",
        element: <UpdateCommunity></UpdateCommunity>,
      },
      {
        path: "/update-post/:id",
        element: <UpdatePost></UpdatePost>,
      },
      {
        path: "/updateComment/:id",
        element: <UpdateComment></UpdateComment>,
      },
      {
        path: "/updateAdminCommunity/:communityId",
        element: <UpdateAdminCommunity></UpdateAdminCommunity>,
      },
    ],
  },
]);
