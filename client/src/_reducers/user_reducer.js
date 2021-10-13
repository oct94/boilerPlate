import { LOGIN_USER } from "../_actions/types";
import { REGISTER_USER } from "../_actions/types";

export default function (state = {}, reducer) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }; //백엔드에서 받아옴.
      break;
    case REGISTER_USER:
      return { ...state, register: action.payload }; //
      break;
    default:
      return state;
  }
}
