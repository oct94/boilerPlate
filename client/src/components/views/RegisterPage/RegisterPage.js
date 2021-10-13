import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions";

function RegisterPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const onChangeEmail = useCallback(() => {
    setEmail(e.target.value);
  }, []);
  const onChangeName = useCallback(() => {
    setName(e.target.value);
  }, []);
  const onChangePassword = useCallback(() => {
    setPassword(e.target.value);
  }, []);
  const onChangePasswordCheck = useCallback(() => {
    setPasswordCheck(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다.");
    }
    let body = {
      email: Email,
      name: Name,
      password: Password,
    };
    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login");
      } else {
        alert("회원가입에 실패하셨습니다.");
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
        <label>Name</label>
        <input type="name" value={name} onChange={onChangeName} />
        <label>Password</label>
        <input type="password" value={password} onChange={onChangePassword} />
        <label>Password-Check</label>
        <input
          type="password"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
        />
        <br />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default RegisterPage;
