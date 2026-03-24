import { createBrowserRouter } from "react-router-dom";

const HomePage = () => import("./features/posts/pages/HomePage");
const LoginPage = () => import("./features/posts/pages/LoginPage");
const PostDetailPage = () => import("./features/posts/pages/HomePage");

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: HomePage,
  },
  {
    path: "/login",
    lazy: LoginPage,
  },
  {
    path: "/posts/:id",
    lazy: PostDetailPage,
  },
]);
