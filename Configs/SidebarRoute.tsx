import { BarChartOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";

// eslint-disable-next-line import/prefer-default-export
export const AdminRoutes = [
  {
    path: '/dashboard',
    key: "dashboard",
    name: "Dashboard",
    icon: <HomeOutlined />,
    children: [],
  },
  {
    path: '/user',
    key: "user",
    name: "User",
    icon: <UserOutlined />,
    children: [
      {
        path: '/user/list',
        key: "user/list",
        name: "List",
      },
      {
        path: '/user/create',
        key: "user/create",
        name: "Create",
      },
    ],
  },
  {
    path: '/reports',
    key: "reports",
    name: "Reports",
    icon: <BarChartOutlined />,
    children: [],
  },
];
