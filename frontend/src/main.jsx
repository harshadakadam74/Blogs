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
import BookMark from "./Pages/BookMark";
import MyPosts from "./Pages/MyPosts";
import LikedPosts from "./Pages/LikedPosts";
import Bookmarks from "./Pages/Bookmarks";
import Followers from "./Pages/Followers";
import Following from "./Pages/Following";
import Settings from "./Pages/Settings";


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
        path="profile/posts"
        element={
          <AuthLayout authentication={true}>
            <MyPosts />
          </AuthLayout>
        }
      />
      <Route
        path="profile/likes"
        element={
          <AuthLayout authentication={true}>
            <LikedPosts />
          </AuthLayout>
        }
      />
      <Route
        path="profile/bookmarks"
        element={
          <AuthLayout authentication={true}>
            <Bookmarks />
          </AuthLayout>
        }
      />
      <Route
        path="profile/followers"
        element={
          <AuthLayout authentication={true}>
            <Followers />
          </AuthLayout>
        }
      />
      <Route
        path="profile/following"
        element={
          <AuthLayout authentication={true}>
            <Following />
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

      <Route
      path="bookmarks"
      element={
        <AuthLayout authentication={true}>
          <BookMark />
        </AuthLayout>
      }
      />

      <Route
        path="settings"
        element={
          <AuthLayout authentication={true}>
            <Settings />
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