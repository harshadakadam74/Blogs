import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import store from "./Store/Store";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AddPost from "./Pages/AddPost";
import AllPosts from "./Pages/AllPosts";
import EditPost from "./Pages/EditPost";
import Post from "./Pages/Post";
import { AuthLayout } from "./Components";
import Profile from "./Pages/Profile";
import AllLikes from "./Pages/AllLikes";
import AllComments from "./Pages/AllComments";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />

      {/* Public Routes */}
      <Route
        path="login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />

      <Route
        path="signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />

      {/* Protected Routes */}
      <Route
        path="all-posts"
        element={
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
        }
      />

      <Route
        path="profile"
        element={
          <AuthLayout authentication={true}>
            <Profile />
          </AuthLayout>
        }
      />

      <Route
        path="all-likes"
        element={
          <AuthLayout authentication={true}>
            <AllLikes />
          </AuthLayout>
        }
      />

      <Route
        path="all-comments"
        element={
          <AuthLayout authentication={true}>
            <AllComments />
          </AuthLayout>
        }
      />


      <Route
        path="add-post"
        element={
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        }
      />

      <Route
        path="post/:slug"
        element={
          <AuthLayout authentication={true}>
            <Post />
          </AuthLayout>
        }
      />

      <Route
        path="edit-post/:slug"
        element={
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        }
      />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);