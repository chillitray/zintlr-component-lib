import { combineReducers } from "redux";
import profileReducer from "./profile/profileSlice";
const rootReducer = combineReducers({
  profile: profileReducer
});
export default rootReducer;