import React from "react";

export type routesType = {
  path: string;
  key: string;
  name: string;
  icon: React.ReactNode;
  children: {
    path: string;
    key: string;
    name: string;
  }[];
}[];
