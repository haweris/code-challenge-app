import { createRouter, createWebHistory } from "vue-router";
import AppContainer from "@/AppContainer";
import UnauthorizedLayout from "@/components/UnauthorizedLayout";
import LoginPage from "@/components/LoginPage";
import ForgotPassword from "@/components/ForgotPassword";
import ResetPassword from "@/components/ResetPassword";
import SignUp from "@/components/SignUp";
import ListArticles from "@/components/ListArticles";
import CreateArticle from "@/components/CreateArticle";

const routes = [
  {
    path: "/",
    component: UnauthorizedLayout,
    children: [
      {
        path: "/signup",
        name: "signup",
        component: SignUp,
      },
      {
        path: "/login",
        name: "login",
        component: LoginPage,
      },
      {
        path: "/forgot-password",
        name: "forgotPassword",
        component: ForgotPassword,
      },
      {
        path: "/reset-password",
        name: "resetPassword",
        component: ResetPassword,
      },
    ],
  },
  {
    path: "/",
    component: AppContainer,
    children: [
      {
        path: "my-articles/new",
        name: "createArticle",
        component: CreateArticle,
        exact: true,
      },
      {
        path: "my-articles",
        name: "myArticles",
        component: ListArticles,
        exact: true,
      },
      {
        path: "articles",
        name: "allArticles",
        component: ListArticles,
        exact: true,
      },
      {
        path: "article/:id/edit",
        name: "editArticle",
        component: CreateArticle,
        props: true,
      },
    ],
  },
  // Fallback route to redirect to the login page for unauthorized access
  {
    path: "/:pathMatch(.*)",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
