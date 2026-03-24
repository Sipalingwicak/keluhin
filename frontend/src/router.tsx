import { createBrowserRouter } from "react-router-dom";

const HomePage = () => import("./features/posts/pages/HomePage");
const LoginPage = () => import("./features/auth/pages/LoginPage");
const PostDetailPage = () => import("./features/posts/pages/PostDetailPage");

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <span className="loading loading-spinner loading-lg text-primary"></span>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: HomePage,
    HydrateFallback: Loading,
  },
  {
    path: "/login",
    lazy: LoginPage,
    HydrateFallback: Loading,
  },
  {
    path: "/posts/:id",
    lazy: PostDetailPage,
    HydrateFallback: Loading,
  },
]);
