import { BarChartOutlined, UserOutlined, HomeOutlined, ContainerOutlined } from "@ant-design/icons";

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
    path: '/blog',
    key: "blog",
    name: "Blog",
    icon: <ContainerOutlined />,
    children: [
      {
        path: '/blog/create',
        key: "blog/create",
        name: "Create",
      },
      {
        path: '/blog',
        key: "blog",
        name: "List",
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
