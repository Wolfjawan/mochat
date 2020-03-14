import { combineReducers } from "redux";
import user from "./UserReducer";
import users from "./UsersReducer";

export default combineReducers({
  user,
  users
});
