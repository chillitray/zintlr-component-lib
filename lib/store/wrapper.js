import React from "react";
import { Provider } from "react-redux";
import store from "./store";
const ReduxWrapper = ({
  children
}) => {
  return /*#__PURE__*/React.createElement(Provider, {
    store: store
  }, children);
};
export default ReduxWrapper;