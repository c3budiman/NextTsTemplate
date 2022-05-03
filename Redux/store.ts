import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./reducer";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  rootReducer,
);

const store = createStore(
  persistedReducer,
  {},
);
const persistor = persistStore(store);

export default function ReduxStore() {
  return {
    store,
    persistor,
  };
}
