import routeConfig from "../config/route";
import Login from "~/page/Login";
import Register from "~/page/Register";
import Home from "~/page/Home";
import ForgotPassword from "~/page/ForgotPassword";
import ResetPassword from "~/page/ResetPassword";
import NotFound from "~/page/NotFound";

export const publicRoute = [
  { path: routeConfig.login, component: Login },
  { path: routeConfig.register, component: Register },
  { path: routeConfig.forgotPassword, component: ForgotPassword },
  { path: routeConfig.resetPassword, component: ResetPassword },
  { path: routeConfig.notfound, component: NotFound },

  { path: routeConfig.home, component: Home },
];
