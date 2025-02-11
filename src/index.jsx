import React from "react";
import { Provider } from "react-redux";
import store from "./store"; // ✅ Ensure Redux store is imported
import ZButton from "./components/ZButton.jsx";

const MyButtonPackage = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export { MyButtonPackage, ZButton };
