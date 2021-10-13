import { combineReducers } from "redux";
import user from "./user_reducer";

const rootReducer = combineReducers({
  //user
  //rootReducer에서 reducer들을 합쳐줌.
  user,
});

export default rootReducer;
