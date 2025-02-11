import { createSlice } from "@reduxjs/toolkit";

const buttonSlice = createSlice({
  name: "button",
  initialState: { clicked: false },
  reducers: {
    toggle: (state) => {
      state.clicked = !state.clicked;
    },
  },
});

export const { toggle } = buttonSlice.actions;
export default buttonSlice.reducer;
