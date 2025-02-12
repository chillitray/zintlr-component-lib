import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountdownStart } from "../store/profile/profileSlice";

const Profile = () => {
  const clicked = useSelector((state) => state.profile.isLoggedIn);

  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(setCountdownStart(!clicked))}>
      {clicked ? "Clicked" : "Click Me"}
    </button>
  );
};

export default Profile;
