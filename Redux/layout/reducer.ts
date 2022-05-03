type actionType = {
  type: string;
  payload: any;
};

const INIT_STATE = {
  sideBarKey: ["dashboard"],
  collapsed: false,
  breadcrumb: [],
};

// eslint-disable-next-line default-param-last
const Layout = (state = INIT_STATE, action: actionType) => {
  switch (action.type) {
    case "CHANGE_SIDEBAR_KEY":
      return {
        ...state,
        sideBarKey: action.payload,
      };
    case "CHANGE_COLLAPSIBLE":
      return {
        ...state,
        collapsed: action.payload,
      };
    case "INSERT_BREADCRUMB":
      return {
        ...state,
        breadcrumb: action.payload,
      };
    default:
      return INIT_STATE;
  }
};

export default Layout;
