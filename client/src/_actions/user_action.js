import axios from "axios";

import { LOGIN_USER } from "./types";
import { REGISTER_USER } from "./types";

export const loginUser = (dataToSubmit) => {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);
  return {
    type: LOGIN_USER,
    payload: request, //request는 백엔드에서 가져온 데이터.
  };
};
export const registerUser = (dataToSubmit) => {
  const request = axios
    .post("/api/register", dataToSubmit)
    .then((res) => res.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
};
