export const changeSidebarKey = (key: string[]) => ({
  type: "CHANGE_SIDEBAR_KEY",
  payload: key,
});

export const changeCollapsible = (key: boolean) => ({
  type: "CHANGE_COLLAPSIBLE",
  payload: key,
});

type breadcrumbType = {
  name: string;
  url: string;
}

export const InsertBreadcrumb = (key: breadcrumbType[]) => ({
  type: "INSERT_BREADCRUMB",
  payload: key,
});
