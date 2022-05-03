import Router, { NextRouter } from "next/router";
import { NonDashboardRoutes } from "../../Configs/NonDashboardRoutes";

export const isNotDashboard = (router: NextRouter) => NonDashboardRoutes.includes(router?.pathname ?? "/");

export const PushNavigateTo = async (routes: string) => {
  // eslint-disable-next-line no-console
  console.log(
    `%c Navigating To : ${routes}`,
    "background: #222; color: #bada55"
  );
  Router.push(routes);
};

export const ReplaceNavigateTo = async (routes: string) => {
  // eslint-disable-next-line no-console
  console.log(
    `%c Navigating To : ${routes}`,
    "background: #222; color: #bada55"
  );
  Router.replace(routes);
};
