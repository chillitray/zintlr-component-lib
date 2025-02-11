import { configureStore } from "@reduxjs/toolkit";
import buttonReducer from "./buttonSlice"; // ✅ Make sure this path is correct

const store = configureStore({
  reducer: {
    button: buttonReducer, // ✅ Ensure reducer is properly mapped
  },
});

export default store; // ✅ Must be default export
