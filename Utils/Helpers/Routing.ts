import Router, { NextRouter } from "next/router";
import { NonDashboardRoutes } from "../../Configs/NonDashboardRoutes";

export const isNotDashboard = (router: NextRouter) => NonDashboardRoutes.includes(router?.pathname ?? "/");

export const PushNavigateTo = async (routes: string) => {
  Router.push(routes);
};

export const ReplaceNavigateTo = async (routes: string) => {
  Router.replace(routes);
};
