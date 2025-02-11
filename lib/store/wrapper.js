import { createWrapper } from "next-redux-wrapper";
import store from "./store";
const makeStore = () => store;
/**
 * This code exports a wrapper for Next.js Redux store using next-redux-wrapper.
 */
const wrapper = createWrapper(makeStore, {
  debug: true
});
export default wrapper;