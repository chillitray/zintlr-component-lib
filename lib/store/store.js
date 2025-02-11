import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./0-root-reducer";

/**
 * Configures the Redux store using @reduxjs/toolkit.
 * @param {object} reducer The root reducer for the store.
 */
const store = configureStore({
  reducer: rootReducer
});
export default store;