import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import authReducer from "./profile/profileSlice";

/**
 * Combines multiple individual reducers into a single reducer function using the combineReducers utility.
 * The individual reducers handle specific parts of the application state.
 * Each key in the combined reducer corresponds to a specific part of the state.
 */
const reducer = combineReducers({
  toast: toastReducer,
  general: generalReducer,
  optout: optoutReducer,
  auth: authReducer
});

/**
 * Combines multiple reducers into a single rootReducer to manage the application state.
 * The rootReducer handles the HYDRATE action to merge server-side state during client-side rehydration.
 *
 * @param {Object} state - The current application state.
 * @param {Object} action - The dispatched action object.
 * @returns {Object} - The updated application state.
 */
const rootReducer = (state = {}, action) => action.type === HYDRATE ? action.payload : reducer(state, action);
export default rootReducer;