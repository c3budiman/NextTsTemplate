import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import React from "react";
import returnStoreAndPersistor from "../../Redux/store";
import { changeCollapsible } from "../../Redux/layout/action";
import { RootState } from "../../Redux/reducer";
import { PushNavigateTo } from "../../Utils/Helpers/Routing";
import { routesType } from "../../Types/Sidebar";

type SidebarProps = {
  session: any;
  routes: routesType;
};

// eslint-disable-next-line no-unused-vars
function Sidebar({ routes, session }: SidebarProps) {
  const { store } = returnStoreAndPersistor();

  const sidebarKey = useSelector((state: RootState) => state.layout.sideBarKey);
  const collapsible = useSelector((state: RootState) => state.layout.collapsed);

  return (
    <Layout.Sider
      style={{
        overflow: "auto",
        minHeight: "100vh",
      }}
      collapsible
      collapsed={collapsible}
      onCollapse={() => {
        store.dispatch(changeCollapsible(!collapsible));
      }}
    >
      <div className="logo-dashboard" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={sidebarKey}
        onSelect={(item) => {
          PushNavigateTo(`/${item.key}`);
        }}
      >
        {routes.map((item) => {
          if (item.children.length > 0) {
            return (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.name}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>{child.name}</Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          }
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.name}
            </Menu.Item>
          );
        })}
      </Menu>
    </Layout.Sider>
  );
}
export default Sidebar;
