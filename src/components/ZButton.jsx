import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../store";

const ZButton = () => {
  const dispatch = useDispatch();
  const clicked = useSelector((state) => state.button.clicked);

  return (
    <button
      onClick={() => dispatch(toggle())}
      style={{ padding: "10px", background: clicked ? "green" : "gray" }}
    >
      {clicked ? "Clicked!" : "Click Me"}
    </button>
  );
};

export default ZButton;
