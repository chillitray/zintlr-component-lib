import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../redux/buttonSlice";

const Profile = () => {
  const clicked = useSelector((state) => state.button.clicked);

  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(setClicked(!clicked))}>
      {clicked ? "Clicked" : "Click Me"}
    </button>
  );
};

export default Profile;
