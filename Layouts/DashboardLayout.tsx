/* eslint-disable jsx-a11y/anchor-is-valid */
import { Layout } from "antd";
import { useRouter } from "next/router";
import React from "react";
import FadeIn from "react-fade-in";
import BreadcrumbOur from "../Components/Global/Breadcrumb";
import HeaderOur from "../Components/Global/Header";
import Sidebar from "../Components/Global/Sidebar";
import { AdminRoutes } from "../Configs/SidebarRoute";
import useWindowSize from "../Utils/Helpers/ReactHelper";
import { isNotDashboard } from "../Utils/Helpers/Routing";

const { Content, Footer } = Layout;

type DashboardLayoutProps = {
  children: React.ReactNode;
  session: any;
};

function DashboardLayout({ children, session }: DashboardLayoutProps) {
  const router = useRouter();
  const { isMobile } = useWindowSize();

  return (
    <Layout hasSider={session?.code === 0}>
      {(session?.code === 0 && !isNotDashboard(router)) && (
        <Sidebar session={session} routes={AdminRoutes} />
      )}
      <Layout className="site-layout">
        <FadeIn>
          <HeaderOur session={session} />
          <Content style={{ margin: "0 16px", background: "transparent" }}>
            {session?.code === 0 ? (
              <BreadcrumbOur />
            ) : <div style={{ height: "32px" }} />}
            <div
              className="site-layout-background"
              style={{ padding: isMobile ? 0 : 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Cecep Budiman © 2022</Footer>
        </FadeIn>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
