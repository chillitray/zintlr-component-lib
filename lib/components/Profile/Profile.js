import { useDispatch, useSelector } from "react-redux";
import { setCountdownStart } from "zintlr-component-lib/lib/store/profile/profileSlice";
const Profile = () => {
  const clicked = useSelector(state => state.button.clicked);
  const dispatch = useDispatch();
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => dispatch(setCountdownStart(!clicked))
  }, clicked ? "Clicked" : "Click Me");
};
export default Profile;