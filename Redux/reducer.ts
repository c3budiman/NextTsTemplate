// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from "redux";

// for layouting, header, sidebar, footer etc...
import Layout from "./layout/reducer";

const rootReducer = combineReducers({
  layout: Layout,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
