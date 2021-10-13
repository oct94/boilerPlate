import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

function LoginPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onSubmit = useCallback((e) => {
    e.preventDefault(); //버튼을 누를 때 마다 리프레시가 되므로 이를 막아줘야 함.

    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("로그인에 실패하셨습니다.");
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmit}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onChangeEmail} />
        <label>Password</label>
        <input type="password" value={password} onChange={onChangePassword} />
        <br />
        <button type="submit">LogIn</button>
      </form>
    </div>
  );
}

export default LoginPage;
