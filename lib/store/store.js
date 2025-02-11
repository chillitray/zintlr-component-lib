import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./0-root-reducer";
const store = configureStore({
  reducer: rootReducer
});
export default store;